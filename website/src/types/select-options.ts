import { SelectOption } from "./select-types";
import { Sentiment } from "./sentiment";

/**
 * Sentiment options excluding the "All" value.
 * Useful when you want to force the user to choose a specific sentiment.
 */

export const SENTIMENT_OPTIONS: SelectOption<Sentiment>[] = [
    { label: "😊 Feliz", value: "Happy" },
    { label: "😢 Triste", value: "Sad" },
    { label: "😠 Enojado", value: "Angry" },
    { label: "😐 Neutral", value: "Neutral" },
];

/**
 * Sentiment options including the "All" option.
 * Useful for filtering all items regardless of sentiment.
 */

export const SENTIMENT_OPTIONS_WITH_ALL: SelectOption<Sentiment>[] = [
    { label: "📋 Todos", value: "All" },
    ...SENTIMENT_OPTIONS,
];
