import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Note } from 'src/models/Note';
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  //Creates an instance of NotesService
  const notesService = new NotesService();

  //Gets the Cognito Identity Id to use as UserId
  const userId = event.requestContext.identity.cognitoIdentityId;

  //Gets the Id from path to use as the Note Id 
  const id = event.pathParameters.id;

  //Gets the respective note by its id to check if it has an attached file to delete and deletes it.
  const getResult = await notesService.getNoteById(id, userId);
  const note = JSON.parse(getResult.body) as Note;
  if (note.attachment) {
    await notesService.deleteFromS3(id, userId, note.attachment);
  }

  //Deletes the note itself
  const result = await notesService.deleteNoteById(id, userId);
  
  return result as APIGatewayProxyResult;
}