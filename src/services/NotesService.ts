import * as uuid from 'uuid'

import NotesRepository from '../repositories/NotesRepository'
import { Note } from '../models/Note'


export default class NotesService {

  notesRepository: NotesRepository;

  constructor(notesRepository: NotesRepository = new NotesRepository()) {
    this.notesRepository = notesRepository
  }

  async getAllNotes(): Promise<Note[]> {
    return this.notesRepository.getAllNotes()
  }

  async createNote(note: Note): Promise<Note> {
    note.id = uuid.v4();
    return await this.notesRepository.createNote(note)
  }

  async updateNote(partialNote: Partial<Note>) {
    return await this.notesRepository.updateNote(partialNote)
  }

  async deleteNoteById(id: string) {
    return await this.notesRepository.deleteNoteById(id)
  }
}