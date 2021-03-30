import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Note } from '../models/Note'

export default class NotesRepository {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly table = process.env.TABLE_NAME) {
  }

  async getAllNotes(): Promise<Note[]> {
    const result = await this.docClient.scan({
      TableName: this.table
    }).promise();

    return result.Items as Note[];
  }

  async getNoteById(id: string): Promise<object> {
    return this.docClient.get({
      TableName: this.table,
      Key: { 'id': id }
    }).promise();
  }

  async createNote(note: Note): Promise<Note> {
    await this.docClient.put({
      TableName: this.table,
      Item: note
    }).promise();

    return note;
  }
  
  async updateNote(partialNote: Partial<Note>): Promise<Note> {
    const updated = await this.docClient.update({
      TableName: this.table,
      Key: { 'id': partialNote.id },
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
  
  async deleteNoteById(id: string) {
    return this.docClient.delete({
      TableName: this.table,
      Key: { 'id': id }
    }).promise();
  }
}