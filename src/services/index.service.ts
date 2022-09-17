import wordsModel from '@/models/words.model';
import sliceArrayIntoChunks from '@/utils/sliceArrayIntoChunks';
import fetch from 'node-fetch';

class IndexService {
  public words = wordsModel;

  public async updateDatabase(): Promise<void> {
    const listFetched = await fetch('https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt');
    const wordsListRaw = await listFetched.text();

    const wordsListArray = wordsListRaw.split('\n');

    const obj = [];

    wordsListArray.forEach(element => {
      obj.push({ word: element });
    });

    const arrayChunks = sliceArrayIntoChunks(obj, 4000);

    await this.words.collection.drop();

    for (const chunck of arrayChunks) {
      try {
        await this.words.insertMany(chunck);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export default IndexService;
