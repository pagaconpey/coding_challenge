import aws_cdk as cdk
from aws_cdk import (
    Stack,
    aws_appsync as appsync,
    aws_dynamodb as dynamodb,
    CfnOutput,
)
from constructs import Construct
import os


class NotesAppStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # DynamoDB Table
        notes_table = dynamodb.Table(
            self, "NotesTable",
            table_name="Notes",
            partition_key=dynamodb.Attribute(
                name="id",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="dateCreated",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=cdk.RemovalPolicy.DESTROY,
        )

        # AppSync API
        api = appsync.GraphqlApi(
            self, "NotesAPI",
            name="notes-api",
            schema=appsync.SchemaFile.from_asset("schema/schema.graphql"),
            authorization_config=appsync.AuthorizationConfig(
                default_authorization=appsync.AuthorizationMode(
                    authorization_type=appsync.AuthorizationType.API_KEY,
                ),
            ),
            xray_enabled=True,
        )

        # DynamoDB Data Source
        notes_data_source = api.add_dynamo_db_data_source(
            "NotesDataSource",
            notes_table
        )

        # -------------------
        # Create Note Resolver (Mutation)
        # -------------------
        notes_data_source.create_resolver(
            "CreateNoteResolver",
            type_name="Mutation",
            field_name="createNote",
            request_mapping_template=appsync.MappingTemplate.from_string("""
                {
                    "version": "2017-02-28",
                    "operation": "PutItem",
                    "key": {
                        "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
                        "dateCreated": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601())
                    },
                    "attributeValues": {
                        "text": $util.dynamodb.toDynamoDBJson($ctx.args.text),
                        "sentiment": $util.dynamodb.toDynamoDBJson($ctx.args.sentiment)
                    }
                }
            """),
            response_mapping_template=appsync.MappingTemplate.from_string("""
                $util.toJson($ctx.result)
            """),
        )

        # -------------------
        # Get Notes Resolver (Query)
        # -------------------
        notes_data_source.create_resolver(
            "GetNotesResolver",
            type_name="Query",
            field_name="getNotes",
            request_mapping_template=appsync.MappingTemplate.from_string("""
                {
                    "version": "2017-02-28",
                    "operation": "Query",
                    "limit": $util.defaultIfNull($ctx.args.limit, 10),
                    #if($ctx.args.nextToken)
                        "nextToken": "$ctx.args.nextToken",
                    #end
                    #if($ctx.args.sentiment)
                        "filter": {
                            "sentiment": {
                                "eq": "$ctx.args.sentiment"
                            }
                        }
                    #end
                }
            """),
            response_mapping_template=appsync.MappingTemplate.from_string("""
                {
                    "items": $util.toJson($ctx.result.items),
                    "nextToken": $util.toJson($util.defaultIfNull($ctx.result.nextToken, null)),
                    "scannedCount": $util.toJson($ctx.result.scannedCount)
                }
            """),
        )

        # Outputs
        CfnOutput(
            self, "GraphQLAPIURL",
            value=api.graphql_url,
            description="GraphQL API URL",
        )

        CfnOutput(
            self, "GraphQLAPIKey",
            value=api.api_key or "",
            description="GraphQL API Key",
        )

        CfnOutput(
            self, "DynamoDBTableName",
            value=notes_table.table_name,
            description="DynamoDB Table Name",
        )


def main():
    app = cdk.App()
    NotesAppStack(
        app, "NotesAppStack",
        env=cdk.Environment(
            account=os.getenv('CDK_DEFAULT_ACCOUNT'),
            region=os.getenv('CDK_DEFAULT_REGION', 'us-east-1')
        ),
    )
    app.synth()


if __name__ == "__main__":
    main()
