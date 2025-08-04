/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../website/src/API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getNote = /* GraphQL */ `query GetNote($id: ID!) {
  getNote(id: $id) {
    id
    text
    sentiment
    dateCreated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetNoteQueryVariables, APITypes.GetNoteQuery>;
export const listNotes = /* GraphQL */ `query ListNotes(
  $filter: ModelNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      sentiment
      dateCreated
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListNotesQueryVariables, APITypes.ListNotesQuery>;
