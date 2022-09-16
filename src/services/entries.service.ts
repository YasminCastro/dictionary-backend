import { dictionaryInstance } from '@/config/axios';
import wordsModel from '@/models/words.model';
import fetch from 'node-fetch';

class EntriesService {
  public words = wordsModel;

  public async findWord(word: string): Promise<any> {
    const { data } = await dictionaryInstance.get(`/${word}`);
    return data[0];
  }

  public async listAllWords(word: string): Promise<any> {
    const listFetched = await fetch('https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt');
    const wordsListRaw = await listFetched.text();

    const wordsListArray = wordsListRaw.split('\n');

    const obj = [];

    wordsListArray.forEach(element => {
      obj.push({ word: element });
    });

    console.log(obj.length);

    const inserindo = obj.slice(0, 4);

    //salvar no banco de dados

    // for (const word in wordsListParsed) {
    //   await this.words.insertMany();
    // }

    return;
  }
}

export default EntriesService;
