import { model, Schema, Document } from 'mongoose';
import { Words } from '@/interfaces/words.interface';

const wordsSchema: Schema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

const wordsModel = model<Words & Document>('Words', wordsSchema);

export default wordsModel;
