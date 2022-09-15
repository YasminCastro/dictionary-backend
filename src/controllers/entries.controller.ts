import EntriesService from '@/services/entries.service';
import { NextFunction, Response } from 'express';
import entriesModel from '@models/entries.model';
import { RequestWithUser } from '@/interfaces/auth.interface';
import favoriteModel from '@/models/favorite.model';
import { HttpException } from '@/exceptions/HttpException';

class EntriesController {
  public entries = entriesModel;
  public favorites = favoriteModel;
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

  public saveFavoriteWord = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const word = String(req.params.word);
      const userId = String(req.user._id);

      const wordFound = await this.favorites.find({ userId, word });

      if (wordFound.length > 0) {
        return res.status(200).json({ message: 'Word is already in the favorites list' });
      }

      await this.favorites.create({ userId, word });

      return res.status(200).json({ message: 'Word was saved' });
    } catch (error) {
      next(error);
    }
  };

  public removeFavoriteWord = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const word = String(req.params.word);
      const userId = String(req.user._id);

      const deletedWord = await this.favorites.deleteOne({ userId, word });

      if (deletedWord.deletedCount === 0) {
        throw new HttpException(404, 'Word not found');
      }

      res.status(200).json({ message: 'Word was deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default EntriesController;
