import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let data = JSON.parse(event.body);
  data.userId = event.requestContext.identity.cognitoIdentityId;
  const notesService = new NotesService()
  const note = await notesService.createNote(data);

  return {
    statusCode: 201,
    body: JSON.stringify({
      note: note
    })
  };
}