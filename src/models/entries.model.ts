import { model, Schema, Document } from 'mongoose';
import { Entries } from '@/interfaces/entries.interface';

const entriesSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  added: { type: Date, default: Date.now },
});

const entriesModel = model<Entries & Document>('Entries', entriesSchema);

export default entriesModel;
