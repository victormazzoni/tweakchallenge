import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Note } from '../models/Note'

export default class NotesRepository {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly table = process.env.TABLE_NAME) {
  }

  async getAllNotes(userId: string): Promise<Note[]> {

    const result = await this.docClient.scan({
      TableName: this.table,
      // 'KeyConditionExpression' defines the condition for the query
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

  async getNoteById(id: string, userId: string): Promise<object> {
    return this.docClient.get({
      TableName: this.table,
      Key: {
        'id': id,
        'userId': userId
      }
    }).promise();
  }

  async createNote(note: Note): Promise<Note> {
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
        'id': partialNote.id,
        'userId': userId
      },
      UpdateExpression: 'set userId = :userId, content = :content, attachment = :attachment',
      ExpressionAttributeValues: {
        ':userId': partialNote.userId,
        ':content': partialNote.content,
        ':attachment': partialNote.attachment
      },
      ReturnValues: 'ALL_NEW'
    }).promise();
    
    return updated.Attributes as Note;
  }
  
  async deleteNoteById(id: string, userId: string) {
    return this.docClient.delete({
      TableName: this.table,
      Key: {
        'id': id,
        'userId': userId
      }
    }).promise();
  }
}