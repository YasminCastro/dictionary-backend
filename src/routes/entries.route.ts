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
    this.router.get(`${this.path}`, authMiddleware, this.entriesController.index);
  }
}

export default EntriesRoute;
