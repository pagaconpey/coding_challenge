import TextInputIcon from "@/components/ui/textInputIcon";
import NoteCard from "@/components/blocks/noteCard";
import { mockNotes } from "@/mock_data/mockNotes";

export default function Home() {
  return (
    <>
      <TextInputIcon placeholder="Escribe una nueva nota..." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockNotes.map((note, index) => (
          <NoteCard key={index} {...note} />
        ))}
      </div>
    </>
  );
}
