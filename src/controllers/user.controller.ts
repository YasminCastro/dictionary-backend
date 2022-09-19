import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/user.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class UsersController {
  public userService = new userService();

  public getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = String(req.user._id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json(findOneUserData);
    } catch (error) {
      next(error);
    }
  };

  public findWordsHistory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = String(req.user._id);
      let page = Number(req.query.page);
      let limit = Number(req.query.limit);

      if (!page) page = 1;
      if (!limit) limit = 5;

      const wordsFound = await this.userService.findUserEntries(userId, page, limit);

      res.status(200).json(wordsFound);
    } catch (error) {
      next(error);
    }
  };

  public findFavoritesWordsHistory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = String(req.user._id);
      let page = Number(req.query.page);
      let limit = Number(req.query.limit);

      if (!page) page = 1;
      if (!limit) limit = 5;

      const wordsFound = await this.userService.findUserFavoritesWords(userId, page, limit);

      res.status(200).json(wordsFound);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
