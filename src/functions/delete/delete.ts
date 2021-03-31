import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const userId = event.requestContext.identity.cognitoIdentityId;
  const notesService = new NotesService();
  const result = await notesService.deleteNoteById(event.pathParameters.id, userId);
  
  return result as APIGatewayProxyResult;
}