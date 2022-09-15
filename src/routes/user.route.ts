import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, authMiddleware, this.userController.getUser);
    this.router.get(`${this.path}/me/history`, authMiddleware, this.userController.findWordHistory);

    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.userController.updateUser);
    this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
  }
}

export default UserRoute;