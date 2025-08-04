import { NoteCardProps } from "@/components/blocks/noteCard";

/**
 * Sorts an array of notes by creation date in descending order (newest first).
 *
 * @param notes - The array of notes to be sorted.
 * @returns A new array of notes sorted from newest to oldest.
 */
export function sortNotesByDateDescending(notes: NoteCardProps[]): NoteCardProps[] {
    return [...notes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * Sorts an array of notes by creation date in ascending order (oldest first).
 *
 * @param notes - The array of notes to be sorted.
 * @returns A new array of notes sorted from oldest to newest.
 */
export function sortNotesByDateAscending(notes: NoteCardProps[]): NoteCardProps[] {
    return [...notes].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
}