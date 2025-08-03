import { gql } from '@apollo/client';

export const GET_ALL_NOTES = gql`
  query GetAllNotes($limit: Int, $nextToken: String) {
    getAllNotes(limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        sentiment
        dateCreated
      }
      nextToken
    }
  }
`;