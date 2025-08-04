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
    const input: CreateNoteInput = {
      text,
      sentiment,
      dateCreated: new Date().toISOString(),
    };

    await client.graphql({
      query: createNoteMutation,
      variables: { input },
    });

    reloadNotes();
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
