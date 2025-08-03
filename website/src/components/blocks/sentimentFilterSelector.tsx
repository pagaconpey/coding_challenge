"use client"

import SelectSentiment from "../ui/selectSentiment";
import { useState } from "react";

type Sentiment = "Happy" | "Neutral" | "Sad" | "Angry";

export default function SentimentFilterSelector() {
    const [sentiment, setSentiment] = useState<Sentiment>("Sad");

    return (
        <>
            <p>Filtrar por sentimiento: </p>
            <SelectSentiment value={sentiment} onChange={setSentiment}/>
        </>
    );
}