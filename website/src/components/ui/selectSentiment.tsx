type Sentiment = "Happy" | "Sad" | "Neutral" | "Angry";

interface SelectSentimentProps {
    value: Sentiment;
    onChange: (value: Sentiment) => void;
}

export default function SelectSentiment({value, onChange,}: SelectSentimentProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as Sentiment)}
            className="select select-bordered select-sm"
        >
            <option disabled>Sentimiento</option>
            <option value="Happy">😊 Feliz</option>
            <option value="Sad">😢 Triste</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Angry">😠 Enojado</option>
        </select>
    );
}
