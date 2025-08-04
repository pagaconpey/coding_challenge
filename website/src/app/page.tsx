// website/src/app/page.tsx
"use client";

import NoteForm from "./components/NoteForm";
import NotesList from "./components/NoteList";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            📝 Mis Notas con Sentimiento
          </h1>
          <p className="text-slate-600">Guarda tus pensamientos y emociones</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:order-1">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              ✨ Crear Nueva Nota
            </h2>
            <NoteForm />
          </div>

          <div className="lg:order-2">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              📚 Tus Notas
            </h2>
            <NotesList />
          </div>
        </div>

        <footer className="text-center mt-12 text-purple-400 text-sm">
          <p>Desarrollado con Next.js, AWS Amplify y mucho 💜</p>
        </footer>
      </div>
    </div>
  );
}
