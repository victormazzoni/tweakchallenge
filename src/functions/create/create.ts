import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const data = JSON.parse(event.body);

  const notesService = new NotesService()
  const note = await notesService.createNote(data);

  return {
    statusCode: 201,
    body: JSON.stringify({
      note: note
    })
  };
}