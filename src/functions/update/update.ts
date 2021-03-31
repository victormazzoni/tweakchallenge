import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'
import { UploadData } from 'src/models/UploadData'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const notesService = new NotesService();
  const userId = event.requestContext.identity.cognitoIdentityId;
  const id = event.pathParameters.id;
  let uploadedFile = { statusCode: 204, body: JSON.stringify({})} 
  const contentType = event.headers['content-type'] ? event.headers['content-type'] : event.headers['Content-Type']

  if (contentType && (contentType.includes('multipart') || contentType.includes('image'))) {
    const formData: UploadData[] = await notesService.parser(event);
    const file = formData[0];
    uploadedFile = await notesService.uploadToS3(id, userId, file);
  }

  const result = await notesService.updateNote(id, userId, uploadedFile);

  return result as APIGatewayProxyResult;
}