// website/src/components/NoteForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { Sentiment } from "@/API";
import { useNotes } from "../hooks/useNotes"; // importamos directamente el hook

export default function NoteForm() {
  const { createNote } = useNotes(); // obtenemos la función aquí
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<{
    text: string;
    sentiment: Sentiment;
  }>({ defaultValues: { sentiment: Sentiment.neutral } });

  const onSubmit = async (data: { text: string; sentiment: Sentiment }) => {
    try {
      await createNote(data.text, data.sentiment);
      reset({ text: "", sentiment: Sentiment.neutral });
    } catch (error) {
      console.error("Error en onSubmit:", error);
      // El error ya se maneja en useNotes, aquí solo lo loggeamos
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100">
      {/* Campo de texto para la nota */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">✍️ Tu nota</label>
        <textarea
          {...register("text", { required: true })}
          placeholder="Escribe tu nota aquí..."
          className="w-full border border-purple-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 resize-none bg-white/80 text-slate-800 placeholder-slate-400"
          rows={3}
        />
      </div>

      {/* Selector de sentimiento */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">🎭 Sentimiento</label>
        <select
          {...register("sentiment")}
          className="w-full border border-purple-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/80 text-slate-800"
        >
          {Object.values(Sentiment).map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-purple-300 disabled:to-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-md"
      >
        {isSubmitting ? "✨ Creando..." : "💾 Crear Nota"}
      </button>
    </form>
  );
}
