import NoteCard from "../blocks/noteCard";
import { NoteCardProps } from "../blocks/noteCard";

type GridNotesProps = {
    notes: NoteCardProps[];
};

export default function GridNotes({ notes }: GridNotesProps) {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
                {notes.map((note, index) => (
                    <NoteCard key={index} {...note} />
                ))}
            </div>
        </div>
    );
}