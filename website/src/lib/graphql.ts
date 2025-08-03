import { generateClient } from "aws-amplify/api";
import "./amplify-config";

export const createNote = /* GraphQL */ `
  mutation CreateNote($text: String!, $sentiment: Sentiment!) {
    createNote(text: $text, sentiment: $sentiment) {
      id
      text
      sentiment
      dateCreated
    }
  }
`;

export const getNotes = /* GraphQL */ `
  query GetNotes($sentiment: Sentiment, $limit: Int, $nextToken: String) {
    getNotes(sentiment: $sentiment, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        sentiment
        dateCreated
      }
      nextToken
      scannedCount
    }
  }
`;

// Cliente GraphQL
export const client = generateClient();
