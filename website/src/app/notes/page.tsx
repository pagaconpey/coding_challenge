
import GridNotes from "@/components/layout/gridNotes"
import HorizontalCenter from "@/components/layout/horizontalCenter"
import { createApolloSSRClient } from "@/lib/apolloSSRClient"
import { GET_ALL_NOTES } from "@/lib/graphql/getAllNotes"
import { NoteCardProps } from "@/components/blocks/noteCard"
import { sortNotesByDateDescending } from "@/utils/sortByDateNotes"

export default async function NotesPage() {
    const client = createApolloSSRClient();

    const { data } = await client.query({
        query: GET_ALL_NOTES,
        variables: { limit: 10 },
    });

    interface NoteApi {
        text: string;
        sentiment: string;
        dateCreated: string;
    }

    // Fetch and sort the Notes DESCENDING by date by default
    const notes: NoteCardProps[] = data.getAllNotes.items.map((note: NoteApi) => ({
        content: note.text,
        sentiment: note.sentiment,
        createdAt: note.dateCreated,
    }))

    const sortedNotes: NoteCardProps[] = sortNotesByDateDescending(notes);
        
    return (
        <HorizontalCenter className="pt-8 pb-16">
            <GridNotes notes={sortedNotes} />
        </HorizontalCenter>
    );
}