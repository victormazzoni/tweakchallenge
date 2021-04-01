import NotesRepository from '../repositories/NotesRepository'
import { UploadData } from 'src/models/UploadData';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export default class NotesService {

  notesRepository: NotesRepository;

  constructor(notesRepository: NotesRepository = new NotesRepository()) {
    this.notesRepository = notesRepository
  }

  //Gets all notes from an user
  async getAllNotes(userId: string) {
    return this.notesRepository.getAllNotes(userId)
  }

  //Gets a specific note from an user
  async getNoteById(id: string, userId: string) {
    return this.notesRepository.getNoteById(id, userId)
  }

  //Creates a note
  async createNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    return await this.notesRepository.createNote(id, userId, uploadedFile)
  }

  //Updates a specific note
  async updateNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    return await this.notesRepository.updateNote(id, userId, uploadedFile)
  }

  //Delete a specific note
  async deleteNoteById(id: string, userId: string) {
    return await this.notesRepository.deleteNoteById(id, userId);
  }

  //Parses the event data
  async parser(event: APIGatewayProxyEvent) {
    return await this.notesRepository.parser(event)
  }

  //Uploads a file to s3
  async uploadToS3(id: string, userId: string, file: UploadData) {
    return await this.notesRepository.uploadToS3(id, userId, file)
  }

  //Deletes a specific file from s3 
  async deleteFromS3(id: string, userId: string, fileName: string) {
    return await this.notesRepository.deleteFromS3(id, userId, fileName)
  }
}