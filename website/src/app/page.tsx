import TextInputIcon from "@/components/ui/textInputIcon";
import GridNotes from "@/components/layout/gridNotes";
import { mockNotes } from "@/mock_data/mockNotes";
import TextArea from "@/components/ui/textArea";

export default function Home() {
  return (
    <>
      <TextInputIcon placeholder="Escribe una nueva nota..." />
      <TextArea placeholder="Escribe una nueva nota..." rows={12} />
      <GridNotes notes={mockNotes} />
    </>
  );
}
