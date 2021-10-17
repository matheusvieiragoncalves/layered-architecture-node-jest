import { PrismaUsersRepository } from '../../repositories/prisma/PrismaUsersRepository';
import { CreateUserController } from './UserController';
import { CreateUserService } from './UserService';

export const createUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const createUser = new CreateUserService(usersRepository);
  const createUserController = new CreateUserController(createUser);
  return createUserController;
};
