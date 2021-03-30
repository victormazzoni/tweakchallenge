import NotesRepository from '../repositories/NotesRepository'
import { Note } from '../models/Note'
import { UploadData } from 'src/models/UploadData';


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

  async createNote(note: Note): Promise<Note> {
    return await this.notesRepository.createNote(note)
  }

  async updateNote(partialNote: Partial<Note>, userId: string) {
    return await this.notesRepository.updateNote(partialNote, userId)
  }

  async deleteNoteById(id: string) {
    return await this.notesRepository.deleteNoteById(id)
  }

  async uploadToS3(id: string, userId: string, file: UploadData) {
    return await this.notesRepository.uploadToS3(id, userId, file)
  }
}