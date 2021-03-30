import 'source-map-support/register'
import { APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (): Promise<APIGatewayProxyResult> => {

  const notesService = new NotesService()
  const notes = await notesService.getAllNotes();

  return {
    statusCode: 200,
    body: JSON.stringify({
      notes: notes
    })
  };
}