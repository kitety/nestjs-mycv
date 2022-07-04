import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  // 每次运行都重新执行
  beforeEach(async () => {
    // store users
    const users: User[] = [];
    // create a fake copy of the user service
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers: User[] = users.filter(
          (user) => user.email === email,
        );
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(999 * Math.random()),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    // di
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  it('creates a new user with salted and hashede password', async () => {
    const user = await service.signup('1@qq.com', 'pwd');
    expect(user.password).not.toEqual('pwd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, email: '123@qq.com', password: '123' } as User,
      ]);
    try {
      await service.signup('123@qq.com', '123');
    } catch (err) {
      expect(err.message).toMatch('email is already in use');
    }
  });
  it('throws an error if user signs up with email that is in use 2', async () => {
    await service.signup('123@qq.com', '123');
    try {
      await service.signup('123@qq.com', '123');
    } catch (err) {
      expect(err.message).toMatch('email is already in use');
    }
  });

  it('throws if signin is called with an unused email', async () => {
    try {
      await service.signin('123@qq.com', '123');
    } catch (err) {
      expect(err.message).toMatch('user is not found');
    }
  });
  it('throws if an invalid password is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, email: '123@qq.com', password: '123' } as User,
      ]);
    try {
      await service.signin('123@qq.com', '1231');
    } catch (err) {
      expect(err.message).toMatch('bad password');
    }
  });
  it('throws if an invalid password is provided 2', async () => {
    await service.signup('123@qq.com', '123');
    try {
      await service.signin('123@qq.com', '1231');
    } catch (err) {
      expect(err.message).toMatch('bad password');
    }
  });
  it('returns a user if correct password is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: '1@qq.com',
          password:
            '72c7576343a1460d.0cd94db97171d846dae8b665081a4f8432b9fd330271e5ca3a91bc27c278ac59',
        } as User,
      ]);
    const user = await service.signin('1@qq.com', 'pwd');
    expect(user).toBeDefined();
  });
  it('returns a user if correct password is provided 2', async () => {
    await service.signup('1@qq.com', 'pwd');
    const user = await service.signin('1@qq.com', 'pwd');
    expect(user).toBeDefined();
  });
});
