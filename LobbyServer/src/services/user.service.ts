import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/user.interface';
import userModel from '@models/user.model';
import { isEmpty } from '@utils/util';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await userModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser = await userModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    //const findUser = await this.userModel.findOne({ email: userData.email });
    //if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    //const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await userModel.create({ ...userData });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // if (userData.nickname) {
    //   const findUser = await this.userModel.findOne({ nickname: userData.nickname });
    //   if (findUser && findUser._id != userId) throw new HttpException(409, `You're nickname ${userData.nickname} already exists`);
    // }

    // if (userData.password) {
    //   const hashedPassword = await hash(userData.password, 10);
    //   userData = { ...userData, password: hashedPassword };
    // }

    const updateUserById = await userModel.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById = await userModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
