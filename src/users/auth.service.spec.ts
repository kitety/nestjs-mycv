import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  // 每次运行都重新执行
  beforeEach(async () => {
    // create a fake copy of the user service
    const fakeUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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
});
