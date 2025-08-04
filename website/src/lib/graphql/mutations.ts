// lib/graphql/mutations.ts
import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote(
    $id: String!
    $text: String!
    $sentiment: Sentiment!
    $dateCreated: AWSDateTime!
  ) {
    createNote(
      id: $id
      text: $text
      sentiment: $sentiment
      dateCreated: $dateCreated
    ) {
      id
      text
      sentiment
      dateCreated
    }
  }
`;
