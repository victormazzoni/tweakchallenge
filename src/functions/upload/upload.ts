import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'
import parser from './parser';
import { UploadData } from 'src/models/UploadData';

const MAX_SIZE = 4000000 // 4MB

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const notesService = new NotesService();
    const formData: UploadData[] = await parser(event, MAX_SIZE);
    const file = formData[0];

    return await notesService.uploadToS3("", event.requestContext.identity.cognitoIdentityId, file);
        
}