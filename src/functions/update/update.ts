import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'
import { UploadData } from 'src/models/UploadData'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const notesService = new NotesService()
  const formData: UploadData[] = await notesService.parser(event);
  const file = formData[0];

  const uploadedFile = await notesService.uploadToS3(id, event.requestContext.identity.cognitoIdentityId, file);

  const note = await notesService.updateNote(id, event.requestContext.identity.cognitoIdentityId, uploadedFile);

  return {
    statusCode: 200,
    body: JSON.stringify({
      note: note
    })
  };
}