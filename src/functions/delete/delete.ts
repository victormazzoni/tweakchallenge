import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notesService = new NotesService()
  await notesService.deleteNoteById(event.pathParameters.id, event.requestContext.identity.cognitoIdentityId);

  return {
    statusCode: 200,
    body: ''
  };
}