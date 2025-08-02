import TextInputIcon from "@/components/ui/textInputIcon";
import GridNotes from "@/components/layout/gridNotes";
import { mockNotes } from "@/mock_data/mockNotes";
import TextArea from "@/components/ui/textArea";
import GhostTextInput from "@/components/ui/ghostTextInput";
import GhostTextArea from "@/components/ui/ghostTextArea";
import NoteFormCard from "@/components/blocks/noteFormCard";

export default function Home() {
  return (
    <>
      {/* <TextInputIcon placeholder="Escribe una nueva nota..." />
      <TextArea placeholder="Escribe una nueva nota..." rows={12} />
      <GhostTextInput placeholder="Tomala pum xd!" />
      <GhostTextArea placeholder="Test to test" rows={12}/>
      <GridNotes notes={mockNotes} /> */}

        <NoteFormCard/>
    </>
  );
}
