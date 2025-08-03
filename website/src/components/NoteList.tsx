'use client';

import { useEffect, useState, useCallback } from "react";
import { client } from "../lib/graphql";
import { getNotes } from "../lib/graphql";

interface Note {
  id: string;
  text: string;
  sentiment: string;
  dateCreated: string;
}

interface NoteQueryResult {
  getNotes: {
    items: Note[];
    nextToken: string | null;
    scannedCount: number;
  };
}

interface NoteListProps {
  reload: number;
}

export default function NoteList({ reload }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sentiment, setSentiment] = useState("");
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadNotes = useCallback(async (token: string | null = null) => {
    const loadingState = token ? setIsLoadingMore : setIsLoading;
    loadingState(true);
    
    try {
      const variables: {
        limit: number;
        nextToken: string | null;
        sentiment?: string;
      } = { limit: 10, nextToken: token || null };
      
      if (sentiment) variables.sentiment = sentiment;
      
      const { data } = await client.graphql({
        query: getNotes,
        variables
      }) as { data: NoteQueryResult };
      
      const res = data.getNotes;
      
      setNotes(token ? [...notes, ...res.items] : res.items);
      setNextToken(res.nextToken);
    } catch (error) {
      console.error("Error loading notes:", error);
      alert("Error al cargar las notas. Por favor, recarga la página.");
    } finally {
      loadingState(false);
    }
  }, [sentiment, notes]);

  useEffect(() => { 
    loadNotes(); 
  }, [reload, sentiment, loadNotes]);

  const getSentimentEmoji = (sentiment: string) => {
    const emojis: { [key: string]: string } = {
      happy: "😄",
      sad: "😢", 
      neutral: "😐",
      angry: "😡"
    };
    return emojis[sentiment] || "😐";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando notas...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <label htmlFor="sentiment-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por sentimiento
        </label>
        <select 
          id="sentiment-filter"
          value={sentiment} 
          onChange={(e) => setSentiment(e.target.value)} 
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todos los sentimientos</option>
          <option value="happy">😄 Feliz</option>
          <option value="sad">😢 Triste</option>
          <option value="neutral">😐 Neutral</option>
          <option value="angry">😡 Enojado</option>
        </select>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No hay notas aún</p>
          <p className="text-sm">¡Crea tu primera nota arriba!</p>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 mb-2">{note.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getSentimentEmoji(note.sentiment)}</span>
                      <span className="text-sm text-gray-500 capitalize">{note.sentiment}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 ml-4">
                    {formatDate(note.dateCreated)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          
          {nextToken && (
            <div className="mt-6 text-center">
              <button 
                onClick={() => loadNotes(nextToken)}
                disabled={isLoadingMore}
                className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                {isLoadingMore ? "Cargando..." : "Cargar más notas"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 