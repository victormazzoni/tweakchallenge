export interface Note {
    id: string, // A unique uuid
    userId: string, // The id of the author
    content: string, // Parsed from request body
    attachment: string, // Parsed from request body
    createdAt: string, // Current Unix timestamp
}