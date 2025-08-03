// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const appSyncConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_DYNAMO_DB_API_KEY}`,
    apiDomain: `${process.env.NEXT_PUBLIC_DYNAMO_DB_API_URL}`
}

const client = new ApolloClient({
    link: createHttpLink({
        uri: appSyncConfig.apiDomain,
        headers: {
            "x-api-key": appSyncConfig.apiKey,
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
