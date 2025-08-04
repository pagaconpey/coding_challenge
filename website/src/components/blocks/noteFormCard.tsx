"use client"

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "@/lib/graphql/mutations";
import { Sentiment } from "@/types/sentiment";
import { SENTIMENT_OPTIONS } from "@/types/select-options";
import { ulid } from "ulid";

import GhostTextArea from "../ui/ghostTextArea";
import SelectSentiment from "../ui/selectSentiment";



export default function NoteFormCard() {
    const [noteText, setNoteText] = useState("");
    const [sentiment, setSentiment] = useState<Sentiment>("Happy");

    const [createNote, { loading }] = useMutation(CREATE_NOTE);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create the object to be created on DynamoDB
        const newNote = {
            id: ulid(),
            text: `${noteText}`,
            sentiment: sentiment.toLowerCase(),
            dateCreated: new Date().toISOString(),
        };

        // Save the data in DynamoDB if not empty
        try {
            if (noteText !== "") {
                await createNote({ variables: newNote });
                alert("Nota guardada correctamente"); 
                setNoteText("");
            } else {
                alert("La nota esta vacia");
            }
            
        } catch (err) {
            console.error("Error creating note:", err);
            alert("Error al guardar la nota");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="card card-md sm:card-xl w-64 sm:w-180 bg-base-200 text-base-content shadow-md flex flex-col"
        >
            <div className="card-body flex flex-col flex-grow">
                <div className="mt-4 flex-grow">
                    <GhostTextArea
                        placeholder="Añade una nota..."
                        rows={12}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                </div>
                <div className="card-actions flex justify-between items-center mt-4 pt-2 border-t border-base-content/30">
                    <SelectSentiment value={sentiment} onChange={setSentiment} options={SENTIMENT_OPTIONS}/>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-info normal-case"
                            onClick={() => setNoteText("")}
                        >
                            Limpiar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary normal-case"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar Nota"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
