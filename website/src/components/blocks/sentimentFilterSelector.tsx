"use client"

import SelectSentiment from "../ui/selectSentiment";
import { Sentiment } from "@/types/sentiment";
import { SENTIMENT_OPTIONS_WITH_ALL } from "@/types/select-options";
import { useState } from "react";

export default function SentimentFilterSelector() {
    const [sentiment, setSentiment] = useState<Sentiment>("All");

    return (
        <>
            <p>Filtrar por sentimiento: </p>
            <SelectSentiment value={sentiment} onChange={setSentiment} options={ SENTIMENT_OPTIONS_WITH_ALL } />
        </>
    );
}