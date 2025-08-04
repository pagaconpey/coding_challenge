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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Campo de texto para la nota */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tu nota</label>
        <textarea
          {...register("text", { required: true })}
          placeholder="Escribe tu nota aquí..."
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
      </div>

      {/* Selector de sentimiento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sentimiento</label>
        <select
          {...register("sentiment")}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
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
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
      >
        {isSubmitting ? "Creando..." : "Crear Nota"}
      </button>
    </form>
  );
}
