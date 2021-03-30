import { v4 as uuid } from 'uuid'
import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Note } from '../models/Note'
import { UploadData } from 'src/models/UploadData';

const s3 = new AWS.S3();

export default class NotesRepository {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly table = process.env.TABLE_NAME) {
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

  async createNote(note: Note): Promise<Note> {
    note.id = uuid();
    await this.docClient.put({
      TableName: this.table,
      Item: note
    }).promise();

    return note;
  }
  
  async updateNote(partialNote: Partial<Note>, userId: string): Promise<Note> {
    
    const updated = await this.docClient.update({
      TableName: this.table,
      Key: {
        'id': partialNote.id
      },
      UpdateExpression: 'set userId = :userId, content = :content, attachment = :attachment',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':content': AWS.config.credentials.accessKeyId,
        ':attachment': AWS.config.credentials.secretAccessKey
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
  
  async uploadToS3(noteId: string, userId: string, file: UploadData) {
    const bucket = process.env.BUCKET_NAME
    const MAX_SIZE = 4000000 // 4MB
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
        console.log(size <= MAX_SIZE && MIME_TYPES.includes(mimeType));
        return size <= MAX_SIZE && MIME_TYPES.includes(mimeType);
    }

    if (!isAllowedFile(file.content.length, file.contentType))
      {
          return getErrorMessage("File size or type not allowed");
      }

    const uid = uuid()
    const originalKey = `${uid}_original_${file.filename}`

    const originalFile = await Promise.all([
        upload(bucket, originalKey, file.content, file.contentType),
    ])

    const signedOriginalUrl = s3.getSignedUrl("getObject", { Bucket: bucket, Key: originalKey, Expires: 60000 })

    return {
      statusCode: 200,
      body: JSON.stringify({
          id: uid,
          mimeType: file.contentType,
          originalKey: originalKey,
          bucket: bucket,
          fileName: file.filename,
          originalUrl: signedOriginalUrl,
          originalSize: file.content.length
      })
    };
  }
}