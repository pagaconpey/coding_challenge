// website/src/hooks/useNotes.ts
import { useState, useEffect, useCallback } from "react";
import {
  CreateNoteInput,
  Note,
  Sentiment,
  ListNotesQuery,
  ModelNoteFilterInput,
} from "@/API";
import { listNotesQuery } from "@/lib/graphql";
import { createNote as createNoteMutation } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filterSentiment, setFilterSentiment] = useState<Sentiment | "">("");
  const [nextToken, setNextToken] = useState<string | null>(null);

  // Función para crear cliente GraphQL de forma lazy
  const createClient = () => {
    return generateClient({
      authMode: "apiKey",
    });
  };
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [isLoadingMoreNotes, setIsLoadingMoreNotes] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const loadNotes = useCallback(
    async (
      token: string | null = null,
      currentFilterSentiment: Sentiment | "" = ""
    ) => {
      const loadingStateSetter = token
        ? setIsLoadingMoreNotes
        : setIsLoadingNotes;
      loadingStateSetter(true);

      try {
        const filter: ModelNoteFilterInput = {};
        if (currentFilterSentiment) {
          filter.sentiment = { eq: currentFilterSentiment as Sentiment };
        }

        // Configurar cliente con API key explícita (lazy)
        const client = createClient();
        const result = await client.graphql({
          query: listNotesQuery,
          variables: { limit: 10, nextToken: token, filter },
          authMode: "apiKey", // Forzar API key en cada petición
        });

        const { data } = result as { data: ListNotesQuery };

        const res = data.listNotes;
        const fetchedNotes: Note[] = (res?.items || []).filter(
          (item): item is Note => item !== null
        );

        setNotes((prev) => (token ? [...prev, ...fetchedNotes] : fetchedNotes));
        setNextToken(res?.nextToken || null);
      } catch (error) {
        console.error("Error loading notes:", error);

        // Manejar errores específicos de GraphQL/AWS
        let errorMessage = "Error desconocido";

        if (error && typeof error === "object") {
          const errorObj = error as Record<string, unknown>;
          // Error de GraphQL
          if ("errors" in errorObj && Array.isArray(errorObj.errors)) {
            errorMessage = (errorObj.errors as Array<{ message: string }>)
              .map((e) => e.message)
              .join(", ");
          }
          // Error de AWS Amplify
          else if (
            "message" in errorObj &&
            typeof errorObj.message === "string"
          ) {
            errorMessage = errorObj.message;
          }
          // Error con propiedad error
          else if (
            "error" in errorObj &&
            errorObj.error &&
            typeof errorObj.error === "object" &&
            "message" in errorObj.error
          ) {
            errorMessage = (errorObj.error as { message: string }).message;
          }
          // Cualquier propiedad message anidada
          else if (
            "data" in errorObj &&
            errorObj.data &&
            typeof errorObj.data === "object" &&
            "message" in errorObj.data
          ) {
            errorMessage = (errorObj.data as { message: string }).message;
          }
        }

        alert(`Error cargando notas: ${errorMessage}`);
      } finally {
        loadingStateSetter(false);
      }
    },
    [] // Sin dependencias - la función es estable
  );

  // Efecto único para cargar notas cuando cambia el filtro o se requiere reload
  useEffect(() => {
    setNotes([]);
    setNextToken(null);
    loadNotes(null, filterSentiment);
  }, [reloadTrigger, filterSentiment]); // Solo estas dependencias, SIN loadNotes

  const reloadNotes = () => setReloadTrigger((prev) => prev + 1);

  const createNote = async (text: string, sentiment: Sentiment) => {
    try {
      const input: CreateNoteInput = {
        text,
        sentiment,
        dateCreated: new Date().toISOString(),
      };

      // Crear cliente de forma lazy para garantizar que Amplify esté configurado
      const client = createClient();
      const result = await client.graphql({
        query: createNoteMutation,
        variables: {
          input,
          condition: undefined, // Opcional, pero incluir para la mutación oficial
        },
        authMode: "apiKey", // Forzar API key en cada petición
      });

      reloadNotes();
    } catch (error) {
      console.error("Error creating note:", error);

      // Manejar errores específicos de GraphQL/AWS
      let errorMessage = "Error desconocido";

      if (error && typeof error === "object") {
        const errorObj = error as Record<string, unknown>;
        // Error de GraphQL
        if ("errors" in errorObj && Array.isArray(errorObj.errors)) {
          errorMessage = (errorObj.errors as Array<{ message: string }>)
            .map((e) => e.message)
            .join(", ");
        }
        // Error de AWS Amplify
        else if (
          "message" in errorObj &&
          typeof errorObj.message === "string"
        ) {
          errorMessage = errorObj.message;
        }
        // Error con propiedad error
        else if (
          "error" in errorObj &&
          errorObj.error &&
          typeof errorObj.error === "object" &&
          "message" in errorObj.error
        ) {
          errorMessage = (errorObj.error as { message: string }).message;
        }
        // Cualquier propiedad message anidada
        else if (
          "data" in errorObj &&
          errorObj.data &&
          typeof errorObj.data === "object" &&
          "message" in errorObj.data
        ) {
          errorMessage = (errorObj.data as { message: string }).message;
        }
      }

      alert(`Error creando nota: ${errorMessage}`);
      throw error; // Re-lanzar para que el componente lo maneje
    }
  };

  return {
    notes,
    filterSentiment,
    setFilterSentiment,
    nextToken,
    isLoadingNotes,
    isLoadingMoreNotes,
    loadNotes,
    createNote,
  };
}
