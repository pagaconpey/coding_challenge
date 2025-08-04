/**
 * Truncates a string to a specified maximum length and appends "..." if it exceeds that length.
 *
 * @param text - The original text to be truncated.
 * @param maxLength - The maximum number of characters to keep before truncating.
 * @returns The truncated string with "..." appended if necessary.
 */


export default function truncateText(text: string, maxLength: number):string {
    if (text.length > maxLength) {
        return `${text.slice(0, maxLength)}...`;
    } else {
        return text;
    }
}