import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, SigninUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      await this.authService.signup(userData);

      const { cookie, findUser, token } = await this.authService.signin(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ id: findUser._id, name: findUser.name, token });
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: SigninUserDto = req.body;
      const { cookie, findUser, token } = await this.authService.signin(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ id: findUser._id, name: findUser.name, token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;