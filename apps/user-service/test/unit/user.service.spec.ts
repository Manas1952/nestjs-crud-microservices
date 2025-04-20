import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/user/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      jest.restoreAllMocks();
  });

  it('should create a user', async () => {
    const user = { name: 'John', email: 'john@example.com' };
    const savedUser = { id: 1, ...user };

    mockUserRepo.save.mockResolvedValue(savedUser);

    const result = await service.create(user);
    expect(repository.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(savedUser);
  });

  it('should find all users', async () => {
    const users = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
    mockUserRepo.find.mockResolvedValue(users);

    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should find one user', async () => {
    const user = { id: 1, name: 'Bob', email: 'bob@example.com' };
    mockUserRepo.findOne.mockResolvedValue(user);

    const result = await service.findOne(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const updateResult = { affected: 1 };
    const updatedData = { name: 'Updated' };

    mockUserRepo.update.mockResolvedValue(updateResult);

    const result = await service.update(1, updatedData);
    expect(repository.update).toHaveBeenCalledWith(1, updatedData);
    expect(result).toEqual(updateResult);
  });

  it('should delete a user', async () => {
    const deleteResult = { affected: 1 };

    mockUserRepo.delete.mockResolvedValue(deleteResult);

    const result = await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(deleteResult);
  });
});
