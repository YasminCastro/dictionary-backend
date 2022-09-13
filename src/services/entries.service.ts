import { dictionaryInstance } from '@/config/axios';

class EntriesService {
  public async findWord(word: string): Promise<any> {
    const { data } = await dictionaryInstance.get(`/${word}`);
    return data[0];
  }
}

export default EntriesService;
