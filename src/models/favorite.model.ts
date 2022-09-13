import { model, Schema, Document } from 'mongoose';
import { Favorite } from '@/interfaces/favorite.interface';

const favoriteSchema: Schema = new Schema({
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

const favoriteModel = model<Favorite & Document>('Favorite', favoriteSchema);

export default favoriteModel;
