import { generateClient } from "aws-amplify/api";

// La mutación para crear una nota.
export const createNoteMutation = /* GraphQL */ `
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      text
      sentiment
      dateCreated
      createdAt
      updatedAt
    }
  }
`;

// La query para listar notas.
export const listNotesQuery = /* GraphQL */ `
  query ListNotes(
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
      }
      nextToken
    }
  }
`;

// Cliente GraphQL con configuración específica de API_KEY
export const client = generateClient({
  authMode: 'apiKey'
});
