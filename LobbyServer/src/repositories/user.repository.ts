import { UserRepository } from '@repositories/user.repository.interface';
import { User } from '@interfaces/user.interface';
import { UserDao } from '@daos/user.dao.interface';

export class UserRepositoryImpl implements UserRepository {

    private userDao: UserDao;
    private userCacheDao: UserDao;

    constructor(userDao: UserDao, userCacheDao: UserDao) {
        this.userDao = userDao;
        this.userCacheDao = userCacheDao;
    }

    //  Create & Update
    public async save(user: User): Promise<User> {
        try {
            const response = await this.userDao.save(user);
            await this.userCacheDao.save(user);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async saveAll(users: Iterable<User>): Promise<void> {
        try {
            await this.userDao.saveAll(users);
            await this.userCacheDao.saveAll(users);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    //  Read
    public async count(): Promise<number> {
        try {
            return await this.userDao.count();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async existsById(id: string): Promise<boolean> {
        try {
            return await this.userDao.existsById(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findById(id: string): Promise<User | undefined | null> {
        try {
            const cached = await this.userCacheDao.findById(id);
            if (cached) {
                return cached;
            } else {
                return await this.userDao.findById(id);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findAll(): Promise<Iterable<User>> {
        try {
            const cached = await this.userCacheDao.findAll();
            if (cached) {
                return cached;
            } else {
                return await this.userDao.findAll();
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findAllById(ids: Iterable<string>): Promise<Iterable<User>> {
        try {
            const cached = await this.userCacheDao.findAllById(ids);
            if (cached) {
                return cached;
            } else {
                return await this.userDao.findAllById(ids);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    //  Delete
    public async delete(user: User): Promise<void> {
        try {
            await this.userDao.delete(user);
            await this.userCacheDao.delete(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.userDao.deleteById(id);
            await this.userCacheDao.deleteById(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteAll(users?: Iterable<User>): Promise<void> {
        try {
            if (users) {
                await this.userDao.deleteAll(users);
                await this.userCacheDao.deleteAll(users);
            } else {
                await this.userDao.deleteAll();
                await this.userCacheDao.deleteAll();
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteAllById(ids: Iterable<string>): Promise<void> {
        try {
            await this.userDao.deleteAllById(ids);
            await this.userCacheDao.deleteAllById(ids);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

