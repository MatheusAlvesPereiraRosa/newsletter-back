import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let createdUserId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        PrismaService,
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({ whitelist: true, transform: true }),
        },
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    if (createdUserId) {
      await service.deleteUser(createdUserId);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      business: 'Example Inc.',
    };

    const result = { id: 1, ...createUserDto };
    jest.spyOn(service, 'createUser').mockResolvedValue(result);

    const createdUser = await controller.createUser(createUserDto);

    createdUserId = createdUser.id;

    expect(createdUser).toEqual(result);
  });

  it('should get all users', async () => {
    const result = [{ id: 1, fullName: 'John Doe', email: 'john@example.com', phone: '1234567890', business: 'Example Inc.' }];
    jest.spyOn(service, 'getAllUsers').mockResolvedValue(result);

    expect(await controller.getAllUsers()).toBe(result);
  });

  it('should fail validation if email is invalid', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'John Doe',
      email: 'invalid-email',
      phone: '1234567890',
      business: 'Example Inc.',
    };

    try {
      await controller.createUser(createUserDto);
    } catch (error) {
      expect(error.response.message).toContain('email must be an email'); // Update to match validation message
    }
  });

  it('should fail validation if phone number is invalid', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: 'invalid-phone',
      business: 'Example Inc.',
    };

    try {
      await controller.createUser(createUserDto);
    } catch (error) {
      expect(error.response.message).toContain('phone must be a string'); // Update to match validation message
    }
  });

  it('should throw a ConflictException if the email is already taken', async () => {
    const createUserDto: CreateUserDto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      business: 'Example Inc.',
    };

    jest.spyOn(service, 'createUser').mockRejectedValue(new ConflictException('The email is already in use!'));

    try {
      await controller.createUser(createUserDto);
    } catch (error) {
      expect(error.response.message).toBe('The email is already in use!');
    }
  });
});
