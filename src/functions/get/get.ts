import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notesService = new NotesService()
  const note = await notesService.getNoteById(event.pathParameters.id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      note: note
    })
  };
}