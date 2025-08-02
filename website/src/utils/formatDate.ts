/* 
**   This function recieves a ISO formated date and returns...
*/

export default function formatDate(awsDateTime: string): string{
    const date = new Date(awsDateTime);
    return date.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}