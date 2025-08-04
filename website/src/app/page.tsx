
import NoteFormCard from "@/components/blocks/noteFormCard";
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
