import wordsModel from '@/models/words.model';
import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';

class IndexController {
  public words = wordsModel;
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: 'Fullstack Challenge 🏅 - Dictionary' });
    } catch (error) {
      next(error);
    }
  };

  public updateDatabase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listFetched = await fetch('https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt');
      const wordsListRaw = await listFetched.text();

      const wordsListArray = wordsListRaw.split('\n');

      const obj = [];

      wordsListArray.forEach(element => {
        obj.push({ word: element });
      });

      console.log(obj.length);

      const inserindo = obj.slice(0, 50);
      const addedWords = await this.words.insertMany(inserindo);

      res.status(200).json(addedWords);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
