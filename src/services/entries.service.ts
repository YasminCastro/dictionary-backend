import { dictionaryInstance } from '@/config/axios';
import { HttpException } from '@/exceptions/HttpException';
import wordsModel from '@/models/words.model';
import { isEmpty } from '@/utils/util';
import fetch from 'node-fetch';

class EntriesService {
  public words = wordsModel;

  public async findWord(word: string): Promise<any> {
    const { data } = await dictionaryInstance.get(`/${word}`);
    return data[0];
  }

  public async listAllWords(userId: string, limit: number, page: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findEntries = await this.words.find().sort({ added: -1 });
    if (!findEntries) throw new HttpException(404, 'Entries not found');

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pageEntries = findEntries.slice(startIndex, endIndex);

    let results = [];

    pageEntries.forEach(wordData => {
      results.push({ word: wordData.word });
    });

    const totalDocs = findEntries.length;
    const totalPages = Math.ceil(totalDocs / limit);

    const hasPrev = page > 1 ? true : false;
    const hasNext = page < totalPages ? true : false;

    return { results, totalDocs, page, totalPages, hasPrev, hasNext };
  }
}

export default EntriesService;
