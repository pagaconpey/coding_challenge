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
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100">
      {/* Filtro */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          🔍 Filtrar por sentimiento
        </label>
        <select
          value={filterSentiment}
          onChange={(e) => setFilterSentiment(e.target.value as Sentiment | "")}
          className="w-full border border-purple-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/80 text-slate-800"
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
        <div className="p-6 text-center text-purple-600">✨ Cargando notas...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-8 text-slate-500">📝 No hay notas aún. ¡Crea tu primera nota!</div>
      ) : (
        <>
          <ul className="space-y-3">
            {notes.map(note => (
              <li key={note.id} className="p-4 border border-purple-100 rounded-xl bg-gradient-to-r from-white/80 to-purple-50/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]">
                <p className="text-slate-800 mb-2 leading-relaxed">{note.text}</p>
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span className="bg-purple-100 px-2 py-1 rounded-full text-purple-700 font-medium">
                    {getSentimentEmoji(note.sentiment)} {note.sentiment}
                  </span>
                  <span className="text-slate-500">{formatDate(note.dateCreated)}</span>
                </div>
              </li>
            ))}
          </ul>

          {nextToken && (
            <div className="mt-6 text-center">
              <button
                onClick={() => loadNotes(nextToken, filterSentiment)}
                disabled={isLoadingMoreNotes}
                className="bg-gradient-to-r from-purple-200 to-purple-300 hover:from-purple-300 hover:to-purple-400 disabled:from-purple-100 disabled:to-purple-200 text-purple-800 font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoadingMoreNotes ? "✨ Cargando más..." : "📖 Cargar más notas"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
