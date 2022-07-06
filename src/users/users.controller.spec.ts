import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne(id: number): null | Promise<User | null> {
        return Promise.resolve({
          id,
          email: 'email@qq.com',
          password: 'password',
        } as User);
      },
      find(email: string): Promise<User[]> {
        return Promise.resolve([
          { id: 1, email, password: 'password' } as User,
        ]);
      },
      async remove(id: number): Promise<User> {
        return Promise.resolve({
          id,
          email: 'email@qq.com',
          password: 'password',
        } as User);
      },
      // async update(id: number, attrs: Partial<User>): Promise<User> {},
    };
    fakeAuthService = {
      async signin(email: string, password: string): Promise<User> {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
      // async signin(email: string, password: string): Promise<User> {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // test 不能处理装饰器
  it('findAllUser returns a list with the given email', async () => {
    const users = await controller.findAllUsers('1@qq.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('1@qq.com');
  });
  it('findOne returns a user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });
  it('findOne returns an error with the not given id', async () => {
    const id = '11';
    try {
      await controller.findUser(id);
    } catch (e) {
      expect(e.message).toEqual('User ' + id + ' is  not found');
    }
  });
  it('should signin updates Session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'user@example.com', password: 'password' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(user.id).toEqual(session.userId);
  });
});
