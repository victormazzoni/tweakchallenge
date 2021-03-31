import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const notesService = new NotesService()
  const result = await notesService.getAllNotes(event.requestContext.identity.cognitoIdentityId);

  return  result as APIGatewayProxyResult;
}