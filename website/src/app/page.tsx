import TextInputIcon from "@/components/ui/textInputIcon";
import GridNotes from "@/components/layout/gridNotes";
import { mockNotes } from "@/mock_data/mockNotes";
import TextArea from "@/components/ui/textArea";
import GhostTextInput from "@/components/ui/ghostTextInput";
import GhostTextArea from "@/components/ui/ghostTextArea";
import NoteFormCard from "@/components/blocks/noteFormCard";
import SelectSentiment from "@/components/ui/selectSentiment";
import HorizontalCenter from "@/components/layout/horizontalCenter";

export default function Home() {
  return (
    <>
      <HorizontalCenter className="mt-10">
        <NoteFormCard />
      </HorizontalCenter>
      {/* <GridNotes notes={mockNotes} /> */}
    </>
  );
}
