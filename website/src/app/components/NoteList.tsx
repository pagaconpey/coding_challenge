// website/src/components/NotesList.tsx
"use client";

import { Sentiment } from "@/API";
import { useNotes } from "../hooks/useNotes";

export default function NotesList() {
  const {
    notes,
    filterSentiment,
    setFilterSentiment,
    isLoadingNotes,
    isLoadingMoreNotes,
    nextToken,
    loadNotes,
  } = useNotes(); // Usamos el hook directamente aquí

  const getSentimentEmoji = (s: Sentiment | string) => {
    const emojis: { [key: string]: string } = {
      [Sentiment.happy]: "😄",
      [Sentiment.sad]: "😢",
      [Sentiment.neutral]: "😐",
      [Sentiment.angry]: "😡"
    };
    return emojis[s as Sentiment] || "😐";
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString("es-ES");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Filtro */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por sentimiento
        </label>
        <select
          value={filterSentiment}
          onChange={(e) => setFilterSentiment(e.target.value as Sentiment | "")}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los sentimientos</option>
          {Object.values(Sentiment).map((s) => (
            <option key={s} value={s}>
              {getSentimentEmoji(s)} {s}
            </option>
          ))}
        </select>
      </div>

      {isLoadingNotes ? (
        <div className="p-6 text-center">Cargando notas...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No hay notas aún</div>
      ) : (
        <>
          <ul className="space-y-3">
            {notes.map(note => (
              <li key={note.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                <p className="text-gray-800 mb-2">{note.text}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{getSentimentEmoji(note.sentiment)} {note.sentiment}</span>
                  <span>{formatDate(note.dateCreated)}</span>
                </div>
              </li>
            ))}
          </ul>

          {nextToken && (
            <div className="mt-6 text-center">
              <button
                onClick={() => loadNotes(nextToken, filterSentiment)}
                disabled={isLoadingMoreNotes}
                className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md"
              >
                {isLoadingMoreNotes ? "Cargando más..." : "Cargar más notas"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
