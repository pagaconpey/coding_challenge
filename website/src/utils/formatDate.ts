/**
 * Formats an AWSDateTime (ISO 8601 string) into a localized date string for Spanish (Mexico).
 *
 * @param awsDateTime - A string in ISO 8601 format (e.g., "2025-08-02T14:30:00.000Z") as returned by AWS AppSync.
 * @returns A date string formatted as "dd/mm/yyyy" according to the "es-MX" locale.
 *
 * @example
 * formatDate("2025-08-02T14:30:00.000Z");
 * // returns "02/08/2025"
 */

export default function formatDate(awsDateTime: string): string{
    const date = new Date(awsDateTime);
    return date.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}