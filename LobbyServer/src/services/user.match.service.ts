import { hash } from 'bcrypt';
import { CreateUserMatchDto } from '@dtos/user.match.dto';
import { HttpException } from '@exceptions/HttpException';
import { UserMatch } from '@interfaces/user.match.interface';
import userMatchModel from '@models/user.match.model';
import { isEmpty } from '@utils/util';

class UserMatchService {
  public async findAllUserMatch(): Promise<UserMatch[]> {
    const userMatchs: UserMatch[] = await userMatchModel.find();
    return userMatchs;
  }

  public async findUserMatchById(userId: string): Promise<UserMatch> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser = await userMatchModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUserMatch(userMatchData: CreateUserMatchDto): Promise<UserMatch> {
    if (isEmpty(userMatchData)) throw new HttpException(400, "You're not userData");

    //const findUser = await this.userMatchModel.findOne({ email: userData.email });
    //if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    //const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserMatch = await userMatchModel.create({ ...userMatchData });

    return createUserData;
  }

  public async updateUserMatch(userId: string, userMatchData: CreateUserMatchDto): Promise<UserMatch> {
    if (isEmpty(userMatchData)) throw new HttpException(400, "You're not userData");

    // if (userData.nickname) {
    //   const findUser = await this.userMatchModel.findOne({ nickname: userData.nickname });
    //   if (findUser && findUser._id != userId) throw new HttpException(409, `You're nickname ${userData.nickname} already exists`);
    // }

    // if (userData.password) {
    //   const hashedPassword = await hash(userData.password, 10);
    //   userData = { ...userData, password: hashedPassword };
    // }

    const updateUserById = await userMatchModel.findByIdAndUpdate(userId, { userMatchData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUserMatch(userId: string): Promise<UserMatch> {
    const deleteUserById = await userMatchModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserMatchService;
