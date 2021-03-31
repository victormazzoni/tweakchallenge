import NotesRepository from '../repositories/NotesRepository'
import { UploadData } from 'src/models/UploadData';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export default class NotesService {

  notesRepository: NotesRepository;

  constructor(notesRepository: NotesRepository = new NotesRepository()) {
    this.notesRepository = notesRepository
  }

  async getAllNotes(userId: string) {
    return this.notesRepository.getAllNotes(userId)
  }

  async getNoteById(id: string, userId: string) {
    return this.notesRepository.getNoteById(id, userId)
  }

  async createNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    return await this.notesRepository.createNote(id, userId, uploadedFile)
  }

  async updateNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    return await this.notesRepository.updateNote(id, userId, uploadedFile)
  }

  async deleteNoteById(id: string, userId: string) {
    return await this.notesRepository.deleteNoteById(id, userId);
  }

  async parser(event: APIGatewayProxyEvent) {
    return await this.notesRepository.parser(event)
  }

  async uploadToS3(id: string, userId: string, file: UploadData) {
    return await this.notesRepository.uploadToS3(id, userId, file)
  }
}