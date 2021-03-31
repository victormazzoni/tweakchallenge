export interface Note {
    id: string, // A unique uuid
    userId: string, // The id of the author
    attachment: string, // Parsed from request body
    createdAt: string, // Current Unix timestamp
    fileUrl: string //Path to note image
}