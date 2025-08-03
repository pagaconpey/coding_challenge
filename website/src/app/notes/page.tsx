import GridNotes from "@/components/layout/gridNotes"
import { mockNotes } from "@/mock_data/mockNotes"

export default function NotesPage() {
    return (
        <>
            <h1>Your Settings</h1>
            <GridNotes notes={mockNotes} />
        </>
    )
}