import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  //Creates an instance of NotesService
  const notesService = new NotesService();

  //Gets the Cognito Identity Id to use as UserId
  const userId = event.requestContext.identity.cognitoIdentityId;

  //Gets all notes from the user with related userId
  const result = await notesService.getAllNotes(userId);

  return  result as APIGatewayProxyResult;
}