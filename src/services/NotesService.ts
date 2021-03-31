import NotesRepository from '../repositories/NotesRepository'
import { Note } from '../models/Note'
import { UploadData } from 'src/models/UploadData';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export default class NotesService {

  notesRepository: NotesRepository;

  constructor(notesRepository: NotesRepository = new NotesRepository()) {
    this.notesRepository = notesRepository
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    return this.notesRepository.getAllNotes(userId)
  }

  async getNoteById(id: string): Promise<object> {
    return this.notesRepository.getNoteById(id)
  }

  async createNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult): Promise<Note> {
    return await this.notesRepository.createNote(id, userId, uploadedFile)
  }

  async updateNote(id: string, userId: string, uploadedFile: APIGatewayProxyResult) {
    return await this.notesRepository.updateNote(id, userId, uploadedFile)
  }

  async deleteNoteById(id: string) {
    return await this.notesRepository.deleteNoteById(id)
  }

  async parser(event: APIGatewayProxyEvent) {
    return await this.notesRepository.parser(event)
  }

  async uploadToS3(id: string, userId: string, file: UploadData) {
    return await this.notesRepository.uploadToS3(id, userId, file)
  }
}