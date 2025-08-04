import { SelectOption } from "@/types/select-types";
import { Sentiment } from "@/types/sentiment";
import { SelectSentimentProps } from "@/types/select-types";

export default function SelectSentiment({value, onChange, options,}: SelectSentimentProps<Sentiment>) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as Sentiment)}
            className="select select-bordered select-sm"
        >
            <option disabled>Sentimiento</option>
            {options.map((opt: SelectOption<string>) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
