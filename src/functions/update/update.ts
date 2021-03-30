import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'
import { Note } from 'src/models/Note'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const notesService = new NotesService()
  const noteParams: Partial<Note> = { ...JSON.parse(event.body), id }

  const note = await notesService.updateNote(noteParams, event.requestContext.identity.cognitoIdentityId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      note: note
    })
  };
}