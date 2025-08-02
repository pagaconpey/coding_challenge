import TextInputIcon from "@/components/ui/textInputIcon";
import GridNotes from "@/components/layout/gridNotes";
import { mockNotes } from "@/mock_data/mockNotes";

export default function Home() {
  return (
    <>
      <TextInputIcon placeholder="Escribe una nueva nota..." />
      <GridNotes notes={mockNotes}/>
    </>
  );
}
