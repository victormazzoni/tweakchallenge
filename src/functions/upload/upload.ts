import { v4 as uuid } from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'
import { UploadData } from 'src/models/UploadData';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const notesService = new NotesService();
    const formData: UploadData[] = await notesService.parser(event);
    const file = formData[0];

    const result = await notesService.uploadToS3(uuid(), event.requestContext.identity.cognitoIdentityId, file);

    return  result as APIGatewayProxyResult;        
}