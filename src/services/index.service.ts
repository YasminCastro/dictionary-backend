import { HttpException } from '@/exceptions/HttpException';
import wordsModel from '@/models/words.model';
import sliceArrayIntoChunks from '@/utils/sliceArrayIntoChunks';
import fetch from 'node-fetch';

class IndexService {
  public words = wordsModel;

  public async updateDatabase(): Promise<void> {
    const listFetched = await fetch('https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt');
    const wordsListRaw = await listFetched.text();

    const wordsListArray = wordsListRaw.split('\n');

    //remove words if special characteres, blank spaces and numbers (api is bugging)
    const regex = /[0-9!@#$%^&*(),.?":{}|<>'-;å\/_ ]/;

    const wordsListParsed = wordsListArray.filter(element => {
      if (element === '' || regex.test(element)) {
      } else {
        return element;
      }
    });

    const wordsLists = [];

    let id = 1;
    wordsListParsed.forEach(element => {
      wordsLists.push({ id, word: element });
      id++;
    });

    const wordsListChunks = sliceArrayIntoChunks(wordsLists, 4000);

    await this.words.collection.drop();

    for (const chunck of wordsListChunks) {
      try {
        await this.words.insertMany(chunck);
      } catch (error: any) {
        throw new HttpException(500, error);
      }
    }
  }
}

export default IndexService;
