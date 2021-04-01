import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Note } from 'src/models/Note';
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const id = event.pathParameters.id;
  const userId = event.requestContext.identity.cognitoIdentityId;
  const notesService = new NotesService();

  const getResult = await notesService.getNoteById(id, userId);
  const note = JSON.parse(getResult.body) as Note;
  if (note.attachment) {
    await notesService.deleteFromS3(id, userId, note.attachment);
  }

  const result = await notesService.deleteNoteById(id, userId);
  
  return result as APIGatewayProxyResult;
}