/**
 * Capitalizes the first letter of a word and returns the result.
 * @param word - The word to capitalize.
 * @returns The word with the first letter capitalized.
 */
export function capitalizeWord(word: string): string {
    if (!word) return ''; // handle empty string

    const firstLetter = word.charAt(0).toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetter + remainingLetters;
}