import EntriesService from '@/services/entries.service';
import { NextFunction, Request, Response } from 'express';

class EntriesController {
  public entriesService = new EntriesService();

  public findWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const word = String(req.params.word);
      const findWordData = await this.entriesService.findWord(word);
      res.status(200).json(findWordData);
    } catch (error) {
      next(error);
    }
  };
}

export default EntriesController;
