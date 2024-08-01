import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@pokemon-shared/entities';
import { UsersService } from '@users/users.service';
import { AuthService } from './auth.service';

const mockUsersService = () => ({
  findOneByUsername: jest.fn(),
  create: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

type MockUsersService = Partial<Record<keyof UsersService, jest.Mock>>;
type MockJwtService = Partial<Record<keyof JwtService, jest.Mock>>;

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: MockUsersService;
  let jwtService: MockJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: mockUsersService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<MockUsersService>(UsersService);
    jwtService = module.get<MockJwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user without password if validation is successful', async () => {
      const user = {
        id: uuidv4(),
        username: 'test',
        password: 'hashedPassword',
      } as User;
      usersService.findOneByUsername.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.validateUser('test', 'password');
      expect(result).toEqual({ id: user.id, username: 'test' });
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('test');
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    });

    it('should return null if validation fails', async () => {
      const user = {
        id: uuidv4(),
        username: 'test',
        password: 'hashedPassword',
      } as User;
      usersService.findOneByUsername.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await authService.validateUser('test', 'wrongPassword');
      expect(result).toBeNull();
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('test');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongPassword',
        'hashedPassword'
      );
    });

    it('should return null if user is not found', async () => {
      usersService.findOneByUsername.mockResolvedValue(null);

      const result = await authService.validateUser('test', 'password');
      expect(result).toBeNull();
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('test');
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { id: uuidv4(), username: 'test' };
      const token = 'jwt-token';
      jwtService.sign.mockReturnValue(token);

      const result = await authService.login(user);
      expect(result).toEqual({ access_token: token });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'test',
        sub: user.id,
      });
    });
  });

  describe('register', () => {
    it('should throw ConflictException if user already exists', async () => {
      const user = { username: 'test', password: 'password' } as User;
      usersService.findOneByUsername.mockResolvedValue(user);

      await expect(authService.register(user)).rejects.toThrow(
        ConflictException
      );
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('test');
    });

    it('should create a new user and return an access token', async () => {
      const user = { username: 'test', password: 'password' } as User;
      const hashedPassword = 'hashedPassword';
      const newUser = {
        ...user,
        id: uuidv4(),
        password: hashedPassword,
      } as User;
      const token = 'jwt-token';

      usersService.findOneByUsername.mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      usersService.create.mockResolvedValue(newUser);
      jwtService.sign.mockReturnValue(token);

      const result = await authService.register(user);
      expect(result).toEqual({ access_token: token });
      expect(usersService.findOneByUsername).toHaveBeenCalledWith('test');
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(usersService.create).toHaveBeenCalledWith({
        ...user,
        password: hashedPassword,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'test',
        sub: newUser.id,
      });
    });
  });
});
