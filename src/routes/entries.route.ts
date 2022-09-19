import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import EntriesController from '@/controllers/entries.controller';

class EntriesRoute implements Routes {
  public path = '/entries/en';
  public router = Router();
  public entriesController = new EntriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.entriesController.listAllWords);
    this.router.get(`${this.path}/:word`, authMiddleware, this.entriesController.findWord);
    this.router.post(`${this.path}/:word/favorite`, authMiddleware, this.entriesController.saveFavoriteWord);
    this.router.delete(`${this.path}/:word/unfavorite`, authMiddleware, this.entriesController.removeFavoriteWord);
  }
}

export default EntriesRoute;
