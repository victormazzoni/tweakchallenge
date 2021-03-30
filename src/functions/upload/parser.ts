import Busboy from 'busboy';
import { APIGatewayProxyEvent } from 'aws-lambda'
import { UploadData } from 'src/models/UploadData';

export default function handler(event: APIGatewayProxyEvent, fileZise: number): Promise<UploadData[]> {
    return new Promise((resolve, reject) => {
        const busboy = new Busboy({
            headers: {
                'content-type':
                event.headers['content-type'] || event.headers['Content-Type']
            },
            limits: {
                fileZise
            }
        });

        let files: UploadData[] = [];
    
        const result = {
            files: files
        };
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            
            const uploadFile: UploadData = {
                content: '',
                filename: '',
                contentType: '',
                encoding: '',
                fieldname: ''
            }
            file.on('data', data => {
                uploadFile.content = data
            });
            file.on('end', () => {
                if (uploadFile.content) {
                    uploadFile.filename = filename
                    uploadFile.contentType = mimetype
                    uploadFile.encoding = encoding
                    uploadFile.fieldname = fieldname
                    result.files.push(uploadFile)
                 }
            })
        })
    
        busboy.on('field', (fieldname, value) => {
            result[fieldname] = value
        });
    
        busboy.on('error', error => {
            reject(error)
        })
    
        busboy.on('finish', () => {
            resolve(result.files);
        })
    
        busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary')
        busboy.end()
        })
}