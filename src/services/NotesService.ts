import * as uuid from 'uuid'

import NotesRepository from '../repositories/NotesRepository'
import { Note } from '../models/Note'


export default class NotesService {

  notesRepository: NotesRepository;

  constructor(notesRepository: NotesRepository = new NotesRepository()) {
    this.notesRepository = notesRepository
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    return this.notesRepository.getAllNotes(userId)
  }

  async getNoteById(id: string, userId: string): Promise<object> {
    return this.notesRepository.getNoteById(id, userId)
  }

  async createNote(note: Note): Promise<Note> {
    note.id = uuid.v4();
    return await this.notesRepository.createNote(note)
  }

  async updateNote(partialNote: Partial<Note>, userId: string) {
    return await this.notesRepository.updateNote(partialNote, userId)
  }

  async deleteNoteById(id: string, userId: string) {
    return await this.notesRepository.deleteNoteById(id, userId)
  }
}