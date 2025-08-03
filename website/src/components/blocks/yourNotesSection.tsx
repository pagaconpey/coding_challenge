"use client"

import HorizontalCenter from "../layout/horizontalCenter";
import HorizontalEnd from "../layout/horizontalEndProps";
import GridNotes from "../layout/gridNotes";
import SentimentFilterSelector from "./sentimentFilterSelector";
import { useState, useMemo } from "react";
import { Sentiment } from "@/types/sentiment";
import { NoteCardProps } from "./noteCard";

export default function YourNotesSection({ sortedNotes }: { sortedNotes: NoteCardProps[] }) {

    const [sentiment, setSentiment] = useState<Sentiment>("All");

    const filteredNotes = useMemo(() => {
        if (sentiment === "Happy") return sortedNotes.filter(note => note.sentiment === "happy")
        if (sentiment === "Sad") return sortedNotes.filter(note => note.sentiment === "sad")
        if (sentiment === "Angry") return sortedNotes.filter(note => note.sentiment === "angry")
        if (sentiment === "Neutral") return sortedNotes.filter(note => note.sentiment === "neutral")
        return sortedNotes;
    }, [sentiment, sortedNotes]);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            <HorizontalCenter className="pt-8 pb-8">
                <h2 className="text-2xl sm:text-3xl">Tus notas</h2>
            </HorizontalCenter>

            <HorizontalEnd className="mb-8 mr-4">
                <SentimentFilterSelector sentiment={sentiment} setSentiment={setSentiment} />
            </HorizontalEnd>

            <GridNotes notes={filteredNotes} />
        </div>
    );
}