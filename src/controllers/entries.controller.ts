import EntriesService from '@/services/entries.service';
import { NextFunction, Response } from 'express';
import entriesModel from '@models/entries.model';
import { RequestWithUser } from '@/interfaces/auth.interface';

class EntriesController {
  public entries = entriesModel;
  public entriesService = new EntriesService();

  public findWord = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const word = String(req.params.word);
      const findWordData = await this.entriesService.findWord(word);

      await this.entries.create({ userId: req.user._id.toString(), word });

      res.status(200).json(findWordData);
    } catch (error) {
      next(error);
    }
  };
}

export default EntriesController;
