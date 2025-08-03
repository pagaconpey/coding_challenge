"use client"

import SelectSentiment from "../ui/selectSentiment";
import { Sentiment } from "@/types/sentiment";
import { SENTIMENT_OPTIONS_WITH_ALL } from "@/types/select-options";

type Props = {
    sentiment: Sentiment;
    setSentiment: (sentiment: Sentiment) => void;
};

export default function SentimentFilterSelector({ sentiment, setSentiment }: Props) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <p className="text-sm font-medium">Filtrar por sentimiento:</p>
            <SelectSentiment
                value={sentiment}
                onChange={setSentiment}
                options={SENTIMENT_OPTIONS_WITH_ALL}
            />
        </div>
    );
}
