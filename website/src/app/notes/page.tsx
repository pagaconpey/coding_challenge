
import GridNotes from "@/components/layout/gridNotes"
import HorizontalCenter from "@/components/layout/horizontalCenter"
import { createApolloSSRClient } from "@/lib/apolloSSRClient"
import { GET_ALL_NOTES } from "@/lib/graphql/getAllNotes"
import { NoteCardProps } from "@/components/blocks/noteCard"

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

    // Fetch and sort the Notes DESCENDING by date 
    const notes: NoteCardProps[] = data.getAllNotes.items.map((note: NoteApi) => ({
        content: note.text,
        sentiment: note.sentiment,
        createdAt: note.dateCreated,
    })).sort((a:NoteCardProps, b:NoteCardProps) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());;

    return (
        <HorizontalCenter className="pt-8">
            <GridNotes notes={notes} />
        </HorizontalCenter>
    );
}