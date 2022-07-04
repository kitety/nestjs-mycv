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
      async signup(email: string, password: string): Promise<User> {},
      async signin(email: string, password: string): Promise<User> {},
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
});
