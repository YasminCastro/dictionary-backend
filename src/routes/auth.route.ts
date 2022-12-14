import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, SigninUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/signin`, validationMiddleware(SigninUserDto, 'body'), this.authController.signIn);
  }
}

export default AuthRoute;
