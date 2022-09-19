import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import historyModel from '@/models/history.model';
import favoriteModel from '@/models/favorite.model';

class UserService {
  public users = userModel;
  public history = historyModel;
  public favorites = favoriteModel;

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }

  public async findUserEntries(userId: string, page: number, limit: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findEntries = await this.history.find({ userId: userId }).sort({ added: -1 });
    if (!findEntries) throw new HttpException(404, 'Entries not found');

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pageEntries = findEntries.slice(startIndex, endIndex);

    let results = [];

    pageEntries.forEach(wordData => {
      results.push({ word: wordData.word, added: wordData.added });
    });

    const totalDocs = findEntries.length;
    const totalPages = Math.ceil(totalDocs / limit);

    const hasPrev = page > 1 ? true : false;
    const hasNext = page < totalPages ? true : false;

    return { results, totalDocs, page, totalPages, hasPrev, hasNext };
  }

  public async findUserFavoritesWords(userId: string, page: number, limit: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findEntries = await this.favorites.find({ userId: userId }).sort({ added: -1 });
    if (!findEntries) throw new HttpException(404, 'Entries not found');

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pageEntries = findEntries.slice(startIndex, endIndex);

    let results = [];

    pageEntries.forEach(wordData => {
      results.push({ word: wordData.word, added: wordData.added });
    });

    const totalDocs = findEntries.length;
    const totalPages = Math.ceil(totalDocs / limit);

    const hasPrev = page > 1 ? true : false;
    const hasNext = page < totalPages ? true : false;

    return { results, totalDocs, page, totalPages, hasPrev, hasNext };
  }
}

export default UserService;
