import { dictionaryInstance } from '@/config/axios';
import { HttpException } from '@/exceptions/HttpException';
import wordsModel from '@/models/words.model';
import { isEmpty } from '@/utils/util';

class EntriesService {
  public words = wordsModel;

  public async findWord(word: string): Promise<any> {
    const { data } = await dictionaryInstance.get(`/${word}`);
    return data[0];
  }

  public async listAllWords(userId: string, limit: number, page: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const totalDocs = await this.words.find().count();
    if (!totalDocs) throw new HttpException(404, 'Entries not found');

    const totalPages = Math.ceil(totalDocs / limit);
    const startFrom = (page - 1) * limit;

    const entries = await this.words.find().sort({ id: 1 }).skip(startFrom).limit(limit);
    if (!entries) throw new HttpException(404, 'Entries not found');

    let results = [];

    entries.forEach(word => {
      results.push(word.word);
    });

    const hasPrev = page > 1 ? true : false;
    const hasNext = page < totalPages ? true : false;

    return { results, totalDocs, page, totalPages, hasPrev, hasNext };
  }

  public async removeWordFromDatabase(word: string): Promise<void> {
    const totalDocs = await this.words.deleteOne({ word });

    console.log(totalDocs);
    return;
  }
}

export default EntriesService;
