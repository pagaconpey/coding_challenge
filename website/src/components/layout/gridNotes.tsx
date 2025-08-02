import NoteCard from "../blocks/noteCard";
import { NoteCardProps } from "../blocks/noteCard";

type GridNotesProps = {
    notes: NoteCardProps[];
};

export default function GridNotes({ notes }: GridNotesProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
                <NoteCard key={index} {...note} />
            ))}
        </div>
    );
}