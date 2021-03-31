import Busboy from 'busboy';
import { v4 as uuid } from 'uuid'
import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Note } from '../models/Note'
import { UploadData } from 'src/models/UploadData';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const s3 = new AWS.S3();

export default class NotesRepository {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly table = process.env.TABLE_NAME,
    private readonly bucket = process.env.BUCKET_NAME,
    private readonly maxFileSize = parseInt(process.env.MAX_SIZE)
    ) {
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    const result = await this.docClient.scan({
      TableName: this.table,
      // 'KeyConditionExpression' defines the condition for the scan
      // - 'userId = :userId': only return items with matching 'userId'
      //   partition key
      FilterExpression: "userId = :userId",
      // 'ExpressionAttributeValues' defines the value in the condition
      // - ':userId': defines 'userId' to be the id of the author
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    }).promise();

    return result.Items as Note[];
  }

  async getNoteById(id: string): Promise<object> {
    return this.docClient.get({
      TableName: this.table,
      Key: {
        'id': id
      }
    }).promise();
  }

  async createNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult): Promise<Note> {
    const uploadedFileData = JSON.parse(uploadedFile.body);
    let note: Note = {
      id: id,
      createdAt: new Date().toISOString(),
      userId: userId,
      attachment: uploadedFileData.fileName,
      fileUrl: uploadedFileData.originalUrl
    }

    await this.docClient.put({
      TableName: this.table,
      Item: note
    }).promise();

    return note;
  }
  
  async updateNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult): Promise<Note> {
    const uploadedFileData = JSON.parse(uploadedFile.body);
    const updated = await this.docClient.update({
      TableName: this.table,
      Key: {
        'id': id
      },
      UpdateExpression: 'set userId = :userId, attachment = :attachment, fileUrl = :fileUrl',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':attachment': uploadedFileData.fileName,
        ':fileUrl': uploadedFileData.originalUrl
      },
      ReturnValues: 'ALL_NEW'
    }).promise();

    return updated.Attributes as Note;
  }
  
  async deleteNoteById(id: string) {
    return this.docClient.delete({
      TableName: this.table,
      Key: {
        'id': id
      }
    }).promise();
  }
  
  async uploadToS3(noteId: string, userId: string, file: UploadData): Promise<APIGatewayProxyResult> {
    const PNG_MIME_TYPE = "image/png"
    const JPEG_MIME_TYPE = "image/jpeg"
    const JPG_MIME_TYPE = "image/jpg"
    const MIME_TYPES = [PNG_MIME_TYPE, JPEG_MIME_TYPE, JPG_MIME_TYPE];

    const upload = (bucket, key, buffer, mimeType) =>
        new Promise((resolve, reject) => {
            s3.upload(
                { Bucket: bucket, Key: key, Body: buffer, ContentType: mimeType },
                function(err, data) {
                    if (err) reject(err);
                    resolve(data)
                })
        })

    const getErrorMessage = message => ({ statusCode: 500, body: JSON.stringify( message )});

    const isAllowedFile = (size, mimeType) => {
        return size <= this.maxFileSize && MIME_TYPES.includes(mimeType);
    }

    if (!isAllowedFile(file.content.length, file.contentType))
    {
        return getErrorMessage("File size or type not allowed");
    }

    const originalKey = `${userId}/private/${noteId}/${file.filename}`

    await upload(this.bucket, originalKey, file.content, file.contentType);

    const signedOriginalUrl = s3.getSignedUrl("getObject", { Bucket: this.bucket, Key: originalKey, Expires: 60000 })

    return {
      statusCode: 200,
      body: JSON.stringify({
          id: noteId,
          mimeType: file.contentType,
          originalKey: originalKey,
          bucket: this.bucket,
          fileName: file.filename,
          originalUrl: signedOriginalUrl,
          originalSize: file.content.length
      })
    };
  }

  async parser(event: APIGatewayProxyEvent): Promise<UploadData[]> {
    return new Promise((resolve, reject) => {
      const maxFileSize = this.maxFileSize;
      const busboy = new Busboy({
          headers: {
              'content-type':
              event.headers['content-type'] || event.headers['Content-Type']
          },
          limits: {
            maxFileSize
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
}