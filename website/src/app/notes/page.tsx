
import GridNotes from "@/components/layout/gridNotes"
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

    const notes: NoteCardProps[] = data.getAllNotes.items.map((note: NoteApi) => ({
        content: note.text,
        sentiment: note.sentiment,
        createdAt: note.dateCreated,
    }));

    return <GridNotes notes={notes} />;
}