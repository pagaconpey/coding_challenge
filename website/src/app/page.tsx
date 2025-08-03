'use client';

import { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

export default function Home() {
  const [reload, setReload] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📓 Mis Notas con Sentimiento
          </h1>
          <p className="text-gray-600">
            Guarda tus pensamientos y emociones en un solo lugar
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:order-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Crear Nueva Nota
            </h2>
            <NoteForm onCreate={() => setReload(reload + 1)} />
          </div>
          
          <div className="lg:order-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tus Notas
            </h2>
            <div className="bg-white rounded-lg shadow-sm">
              <NoteList reload={reload} />
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Desarrollado con Next.js, AWS Amplify y mucho ❤️</p>
        </footer>
      </div>
    </div>
  );
}
