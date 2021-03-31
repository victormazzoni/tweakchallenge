import { v4 as uuid } from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UploadData } from 'src/models/UploadData';
import NotesService from 'src/services/NotesService'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const notesService = new NotesService()
  const formData: UploadData[] = await notesService.parser(event);
  const file = formData[0];
  const userId = event.requestContext.identity.cognitoIdentityId;
  const id = uuid();

  const uploadedFile = await notesService.uploadToS3(id, userId, file);

  const result = await notesService.createNote(id, userId, uploadedFile);

  return result as APIGatewayProxyResult;
}