/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateNote = /* GraphQL */ `subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
  onCreateNote(filter: $filter) {
    id
    text
    sentiment
    dateCreated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNoteSubscriptionVariables,
  APITypes.OnCreateNoteSubscription
>;
export const onUpdateNote = /* GraphQL */ `subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
  onUpdateNote(filter: $filter) {
    id
    text
    sentiment
    dateCreated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNoteSubscriptionVariables,
  APITypes.OnUpdateNoteSubscription
>;
export const onDeleteNote = /* GraphQL */ `subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
  onDeleteNote(filter: $filter) {
    id
    text
    sentiment
    dateCreated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNoteSubscriptionVariables,
  APITypes.OnDeleteNoteSubscription
>;
