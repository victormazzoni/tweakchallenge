import { v4 as uuid } from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import NotesService from 'src/services/NotesService'
import { UploadData } from 'src/models/UploadData';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    //Creates an instance of NotesService
    const notesService = new NotesService();

    //Gets the Cognito Identity Id to use as UserId
    const userId = event.requestContext.identity.cognitoIdentityId;
    
    //Creates an empty uploaded file to use in case of no file was present on event
    let uploadedFile = { statusCode: 204, body: JSON.stringify({})} 

    let contentType = '';

    //Checks the request headers and only fill contentType if it exists
    if (event.headers) {
        contentType = event.headers['content-type'] ? event.headers['content-type'] : event.headers['Content-Type'];
    }

    //Checks the file to know if it is an image to parse content and upload to s3
    if (contentType && (contentType.includes('multipart') || contentType.includes('image'))) {
        const formData: UploadData[] = await notesService.parser(event);
        const file = formData[0];
        uploadedFile = await notesService.uploadToS3(uuid(), userId, file);
    }

    return uploadedFile as APIGatewayProxyResult;
}