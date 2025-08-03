import HorizontalCenter from "../layout/horizontalCenter";
import HorizontalEnd from "../layout/horizontalEndProps";
import GridNotes from "../layout/gridNotes";
import SentimentFilterSelector from "./sentimentFilterSelector";
import { NoteCardProps } from "./noteCard";

export default function YourNotesSection({ sortedNotes }: { sortedNotes: NoteCardProps[] }) {
    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            <HorizontalCenter className="pt-8 pb-8">
                <h2 className="text-2xl sm:text-3xl">Tus notas</h2>
            </HorizontalCenter>

            <HorizontalEnd className="mb-8 mr-4">
                <SentimentFilterSelector />
            </HorizontalEnd>

            <GridNotes notes={sortedNotes} />
        </div>
    );
}