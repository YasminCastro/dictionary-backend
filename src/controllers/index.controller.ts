import { NextFunction, Request, Response } from 'express';

import wordsModel from '@/models/words.model';

import IndexService from '@/services/index.service';

class IndexController {
  public words = wordsModel;
  public indexService = new IndexService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: 'Fullstack Challenge 🏅 - Dictionary' });
    } catch (error) {
      next(error);
    }
  };

  public updateDatabase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.indexService.updateDatabase();

      res.status(200).json({ message: 'Database was successfully updated.' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
