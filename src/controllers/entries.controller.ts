import { NextFunction, Request, Response } from 'express';

class EntriesController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: 'Fullstack Challenge 🏅 - Dictionary' });
    } catch (error) {
      next(error);
    }
  };
}

export default EntriesController;
