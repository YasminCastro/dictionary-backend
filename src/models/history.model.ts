import { model, Schema, Document } from 'mongoose';
import { History } from '@/interfaces/entries.interface';

const historySchema: Schema = new Schema({
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

const historyModel = model<History & Document>('History', historySchema);

export default historyModel;
