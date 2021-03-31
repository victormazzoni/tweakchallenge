import * as Busboy from 'busboy';
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

  async getAllNotes(userId: string) {
    return this.docClient.scan({
      TableName: this.table,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    }).promise()
    .then((item) => {
      if (item.Count === 0)
      {
        return {
          statusCode: 204,
          body: JSON.stringify({message: 'Note does not exist.'})
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item.Items)
      }
    })
    .catch((e) => {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify({message: e.message})
      }
    });
  }

  async getNoteById(id: string, userId: string) {
    return this.docClient.query({
      TableName: this.table,
      KeyConditionExpression: '#id = :id',
      FilterExpression: 'userId = :userId',
      ExpressionAttributeNames: {
        '#id': 'id'
      },
      ExpressionAttributeValues: {
        ':id': id,
        ':userId': userId
      }
    }).promise()
    .then((item) => {
      if (item.Count === 0)
      {
        return {
          statusCode: 204,
          body: JSON.stringify({message: 'Note does not exist.'})
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item.Items[0])
      }
    })
    .catch((e) => {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify({message: e.message})
      }
    });
  }

  async createNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    const uploadedFileData = JSON.parse(uploadedFile.body);
    let note: Note = {
      id: id,
      createdAt: new Date().toISOString(),
      userId: userId,
      attachment: uploadedFileData.fileName,
      fileUrl: uploadedFileData.originalUrl
    }

    return this.docClient.put({
      TableName: this.table,
      Item: note
    }).promise()
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify(note)
      }
    })
    .catch((e) => {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify({message: e.message})
      }
    });
  }
  
  async updateNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    const uploadedFileData = JSON.parse(uploadedFile.body);
    let updateExpression = 'set userId = :userId';
    updateExpression = uploadedFileData.fileName ? `${updateExpression}, attachment = :attachment` : updateExpression;
    updateExpression = uploadedFileData.originalUrl ? `${updateExpression}, fileUrl = :fileUrl` : updateExpression;
    
    return this.docClient.update({
      TableName: this.table,
      Key: {
        'id': id
      },
      ConditionExpression: "userId = :userId AND attribute_exists(id)",
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: {
        ':userId': userId,
        ':attachment': uploadedFileData.fileName,
        ':fileUrl': uploadedFileData.originalUrl
      },
      ReturnValues: 'ALL_NEW'
    }).promise()
    .then((updated) => {
      return {
        statusCode: 200,
        body: JSON.stringify(updated.Attributes)
      }
    })
    .catch((e) => {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify({message: e.message})
      }
    });
  }
  
  async deleteNoteById(id: string, userId: string) {
    return this.docClient.delete({
      TableName: this.table,
      Key: {
        'id': id
      },
      ConditionExpression: "userId = :userId",      
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ReturnValues: 'ALL_OLD'
    }).promise()
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({message: 'Note deleted successfully.'})
      }
    })
    .catch((e) => {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify({message: e.message})
      }
    });
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

    const getErrorMessage = message => ({ statusCode: 500, body: JSON.stringify( {message: message} )});

    const isAllowedFile = (size, mimeType) => {
        return size <= this.maxFileSize && MIME_TYPES.includes(mimeType);
    }

    if (!isAllowedFile(file.content.length, file.contentType))
    {
        return getErrorMessage("File size or type not allowed");
    }

    const originalKey = `${userId}/private/${noteId}/${file.filename}`
    return upload(this.bucket, originalKey, file.content, file.contentType)
    .then(() => {
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
    })
    .catch((e) => {
      return {
        statusCode: e.statusCode,
        body: JSON.stringify({message: e.message})
      }
    });
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
            fileSize: maxFileSize
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