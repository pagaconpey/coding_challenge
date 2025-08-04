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
    console.log("🔧 === CREANDO CLIENTE GRAPHQL LAZY ===");
    console.log("🔧 Amplify debería estar configurado ahora");
    const client = generateClient({
      authMode: "apiKey",
    });
    console.log("🔧 Cliente GraphQL creado exitosamente");
    console.log("🔧 === FIN CREACIÓN CLIENTE ===");
    return client;
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
        console.log("🔍 Iniciando loadNotes...");

        const filter: ModelNoteFilterInput = {};
        if (currentFilterSentiment) {
          filter.sentiment = { eq: currentFilterSentiment as Sentiment };
        }

        console.log("🔍 Variables:", { limit: 10, nextToken: token, filter });

        // Configurar cliente con API key explícita (lazy)
        const client = createClient();
        const result = await client.graphql({
          query: listNotesQuery,
          variables: { limit: 10, nextToken: token, filter },
          authMode: "apiKey", // Forzar API key en cada petición
        });

        console.log("🔍 Raw result from GraphQL:", result);

        const { data } = result as { data: ListNotesQuery };

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
          else if ("message" in errorObj && typeof errorObj.message === "string") {
            errorMessage = errorObj.message;
          }
          // Error con propiedad error
          else if ("error" in errorObj && errorObj.error && typeof errorObj.error === "object" && "message" in errorObj.error) {
            errorMessage = (errorObj.error as { message: string }).message;
          }
          // Cualquier propiedad message anidada
          else if ("data" in errorObj && errorObj.data && typeof errorObj.data === "object" && "message" in errorObj.data) {
            errorMessage = (errorObj.data as { message: string }).message;
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
    // Solo cargar notas en el mount inicial, no en cada cambio de filtro
    setNotes([]);
    setNextToken(null);
    loadNotes(null, filterSentiment);
  }, [reloadTrigger, loadNotes, filterSentiment]); // Incluir todas las dependencias

  // Efecto separado para filtrar notas localmente sin peticiones al servidor
  useEffect(() => {
    if (filterSentiment) {
      // Re-fetch solo si hay un filtro activo (esto es necesario por el backend)
      setNotes([]);
      setNextToken(null);
      loadNotes(null, filterSentiment);
    } else {
      // Si no hay filtro, cargar todas las notas
      setNotes([]);
      setNextToken(null);
      loadNotes(null, "");
    }
  }, [filterSentiment, loadNotes]); // Incluir loadNotes como dependencia

  const reloadNotes = () => setReloadTrigger((prev) => prev + 1);

  const createNote = async (text: string, sentiment: Sentiment) => {
    try {
      const input: CreateNoteInput = {
        text,
        sentiment,
        dateCreated: new Date().toISOString(),
      };

      console.log("🚀 === INICIO CREACIÓN NOTA ===");
      console.log("🚀 Input para mutación:", input);
      console.log("🚀 Mutación GraphQL:", createNoteMutation);
      console.log("🚀 Variables completas:", { input });

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

      console.log("✅ === RESPUESTA COMPLETA ===");
      console.log("✅ Resultado raw:", result);
      console.log("✅ Data:", result.data);
      console.log("✅ Errors:", result.errors);
      console.log("✅ Extensions:", result.extensions);
      console.log("✅ === FIN RESPUESTA ===");

      reloadNotes();
    } catch (error) {
      console.error("❌ === ERROR COMPLETO EN CREACIÓN ===");
      console.error("❌ Error raw:", error);
      console.error("❌ Error stringified:", JSON.stringify(error, null, 2));
      console.error("❌ Error type:", typeof error);
      console.error("❌ Error constructor:", error?.constructor?.name);
              console.error("❌ Error stack:", (error as Record<string, unknown>)?.stack);

      // Inspeccionar todas las propiedades del error
      if (error && typeof error === "object") {
        console.error("❌ Propiedades del error:");
        for (const [key, value] of Object.entries(error as Record<string, unknown>)) {
          console.error(`❌   ${key}:`, value);
        }
      }

      // Verificar si es un error de GraphQL con datos
      if (error && typeof error === "object" && "data" in error) {
        console.error("❌ Error data específico:", error.data);
      }

      console.error("❌ === FIN ERROR COMPLETO ===");

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
        else if ("message" in errorObj && typeof errorObj.message === "string") {
          errorMessage = errorObj.message;
        }
        // Error con propiedad error
        else if ("error" in errorObj && errorObj.error && typeof errorObj.error === "object" && "message" in errorObj.error) {
          errorMessage = (errorObj.error as { message: string }).message;
        }
        // Cualquier propiedad message anidada
        else if ("data" in errorObj && errorObj.data && typeof errorObj.data === "object" && "message" in errorObj.data) {
          errorMessage = (errorObj.data as { message: string }).message;
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
