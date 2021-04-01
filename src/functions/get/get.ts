import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  //Creates an instance of NotesService
  const notesService = new NotesService();

  //Gets the Cognito Identity Id to use as UserId
  const userId = event.requestContext.identity.cognitoIdentityId;

  //Gets the Id from path to use as the Note Id 
  const id = event.pathParameters.id;

  //Gets the note with the respective id from the user with related userId
  const result = await notesService.getNoteById(id, userId);

  return  result as APIGatewayProxyResult;
}