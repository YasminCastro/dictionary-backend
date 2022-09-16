import wordsModel from '@/models/words.model';
import sliceArrayIntoChunks from '@/utils/sliceArrayIntoChunks';
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

      const arrayChunks = sliceArrayIntoChunks(obj, 2000);

      for (const chunck of arrayChunks) {
        try {
          await this.words.insertMany(chunck);
        } catch (error) {
          console.log(error);
        }
      }

      res.status(200).json('addedWords');
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
