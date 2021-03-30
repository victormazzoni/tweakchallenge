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
      UpdateExpression: 'set #name = :name, done = :done',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': partialNote.userId
      },
      ReturnValues: 'ALL_NEW'
    }).promise();
    
    return updated.Attributes as Note;
  }
  
  async deleteNoteById(noteId: string) {
    return this.docClient.delete({
      TableName: this.table,
      Key: { 'noteId': noteId }
    }).promise();
  }
}