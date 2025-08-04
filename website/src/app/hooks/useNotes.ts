// website/src/hooks/useNotes.ts
import { useState, useEffect, useCallback } from "react";
import {
  CreateNoteInput,
  Note,
  Sentiment,
  ListNotesQuery,
  ModelNoteFilterInput,
} from "@/API";
import { client, createNoteMutation, listNotesQuery } from "@/lib/graphql";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filterSentiment, setFilterSentiment] = useState<Sentiment | "">("");
  const [nextToken, setNextToken] = useState<string | null>(null);
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

        const { data } = (await client.graphql({
          query: listNotesQuery,
          variables: { limit: 10, nextToken: token, filter },
        })) as { data: ListNotesQuery };

        const res = data.listNotes;
        const fetchedNotes: Note[] = (res?.items || []).filter(
          (item): item is Note => item !== null
        );

        setNotes((prev) => (token ? [...prev, ...fetchedNotes] : fetchedNotes));
        setNextToken(res?.nextToken || null);
      } catch (error) {
        console.error("Error loading notes:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        console.error("Error type:", typeof error);
        console.error("Error constructor:", error?.constructor?.name);
        
        // Manejar errores específicos de GraphQL/AWS
        let errorMessage = 'Error desconocido';
        
        if (error && typeof error === 'object') {
          // Error de GraphQL
          if ('errors' in error && Array.isArray(error.errors)) {
            errorMessage = error.errors.map(e => e.message).join(', ');
          }
          // Error de AWS Amplify
          else if ('message' in error) {
            errorMessage = error.message;
          }
          // Error con propiedad error
          else if ('error' in error && error.error?.message) {
            errorMessage = error.error.message;
          }
          // Cualquier propiedad message anidada
          else if (error.data?.message) {
            errorMessage = error.data.message;
          }
        }
        
        console.error("🚨 Error final:", errorMessage);
        alert(`Error cargando notas: ${errorMessage}`);
      } finally {
        loadingStateSetter(false);
      }
    },
    []
  );

  useEffect(() => {
    setNotes([]);
    setNextToken(null);
    loadNotes(null, filterSentiment);
  }, [reloadTrigger, filterSentiment, loadNotes]);

  const reloadNotes = () => setReloadTrigger((prev) => prev + 1);

  const createNote = async (text: string, sentiment: Sentiment) => {
    try {
      const input: CreateNoteInput = {
        text,
        sentiment,
        dateCreated: new Date().toISOString(),
      };

      console.log('🚀 Creando nota:', input);
      
      const result = await client.graphql({
        query: createNoteMutation,
        variables: { input },
      });

      console.log('✅ Nota creada exitosamente:', result);
      reloadNotes();
    } catch (error) {
      console.error("❌ Error creating note:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      console.error("Error type:", typeof error);
      console.error("Error constructor:", error?.constructor?.name);
      
      // Manejar errores específicos de GraphQL/AWS
      let errorMessage = 'Error desconocido';
      
      if (error && typeof error === 'object') {
        // Error de GraphQL
        if ('errors' in error && Array.isArray(error.errors)) {
          errorMessage = error.errors.map(e => e.message).join(', ');
        }
        // Error de AWS Amplify
        else if ('message' in error) {
          errorMessage = error.message;
        }
        // Error con propiedad error
        else if ('error' in error && error.error?.message) {
          errorMessage = error.error.message;
        }
        // Cualquier propiedad message anidada
        else if (error.data?.message) {
          errorMessage = error.data.message;
        }
      }
      
      console.error("🚨 Error final creando nota:", errorMessage);
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
