"use client"

import { useState } from "react";
import GhostTextInput from "../ui/ghostTextInput";
import GhostTextArea from "../ui/ghostTextArea";
import SelectSentiment from "../ui/selectSentiment";

type Sentiment = "Happy" | "Neutral" | "Sad" | "Angry";

const bgColorMap: Record<Sentiment, string> = {
    Happy: "bg-base-200",
    Neutral: "bg-neutral",
    Sad: "bg-info",
    Angry: "bg-error",
};

const textColorMap: Record<Sentiment, string> = {
    Happy: "text-base-content",
    Neutral: "text-neutral-content",
    Sad: "text-info-content",
    Angry: "text-error-content",
};

export default function NoteFormCard() {

    const [sentiment, setSentiment] = useState<Sentiment>("Happy");
    const bg = bgColorMap[sentiment];
    const txt = textColorMap[sentiment];

    // function handleSubmit(e:) {
    //     e.preventDefault();
    //     // … handle data with sentiment
    // }

    return (
        <form className={`card card-md sm:card-xl w-64 sm:w-180 
                  ${bg} ${txt} shadow-md flex flex-col`}
        >
            <div className="card-body flex flex-col flex-grow">
                <GhostTextInput placeholder="Título" />
                <div className="mt-4 flex-grow">
                    <GhostTextArea placeholder="Añade una nota..." rows={12} />
                </div>
                <div className="card-actions justify-between items-center mt-4 pt-2 border-t border-base-content/30">
                    <SelectSentiment value={sentiment} onChange={setSentiment} />
                    <button type="submit" className="btn btn-sm btn-primary normal-case">
                        Guardar Nota
                    </button>
                </div>
            </div>
        </form>
    );
}