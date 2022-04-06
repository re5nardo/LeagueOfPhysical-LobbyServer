import { CrudRepository } from '@repositories/repository.interface'
import { User } from '@interfaces/user.interface';

export interface UserRepository extends CrudRepository<User, string> {
    //  Create & Update
    save(user: User): Promise<User>;
    saveAll(users: Iterable<User>): Promise<void>;

    //  Read
    count(): Promise<number>;
    existsById(id: string): Promise<boolean>;
    findById(id: string): Promise<User | undefined | null>;
    findAll(): Promise<Iterable<User>>;
    findAllById(ids: Iterable<string>): Promise<Iterable<User>>;

    //  Delete
    delete(user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
    deleteAll(): Promise<void>;
    deleteAll(users: Iterable<User>): Promise<void>;
    deleteAllById(ids: Iterable<string>): Promise<void>;
}
