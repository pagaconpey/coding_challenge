'use client';

import { useState } from "react";
import { client } from "../lib/graphql";
import { createNote } from "../lib/graphql";

interface NoteFormProps {
  onCreate: () => void;
}

export default function NoteForm({ onCreate }: NoteFormProps) {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("neutral");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const note = { text, sentiment };
      await client.graphql({
        query: createNote,
        variables: note
      });
      setText("");
      onCreate(); // refresca lista
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Error al crear la nota. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg shadow-sm">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          Tu nota
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu nota aquí..."
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          required
        />
      </div>
      
      <div>
        <label htmlFor="sentiment" className="block text-sm font-medium text-gray-700 mb-2">
          Sentimiento
        </label>
        <select 
          id="sentiment"
          value={sentiment} 
          onChange={(e) => setSentiment(e.target.value)} 
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="happy">😄 Feliz</option>
          <option value="sad">😢 Triste</option>
          <option value="neutral">😐 Neutral</option>
          <option value="angry">😡 Enojado</option>
        </select>
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
      >
        {isLoading ? "Creando..." : "Crear Nota"}
      </button>
    </form>
  );
} 