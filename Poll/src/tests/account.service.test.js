import AccountService from '../service/account.service.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ✅ Mock dependencies
jest.mock('../models/user.model.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AccountService - Login', () => {
  it('should login successfully and return user with tokens', async () => {
    const mockUser = {
      _id: '123456',
      username: 'testuser',
      password: 'hashed_pass',
      save: jest.fn(),
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockImplementation(() => 'fake_token');

    const result = await AccountService.Login('testuser', '123456');

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashed_pass');
    expect(result.accessToken).toBe('fake_token');
    expect(result.refreshToken).toBe('fake_token');
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should throw error when user not found', async () => {
    User.findOne.mockResolvedValue(null);

    await expect(AccountService.Login('nouser', '123456')).rejects.toThrow('Không tìm thấy user nouser');
  });

  it('should throw error when password is wrong', async () => {
    const mockUser = { username: 'testuser', password: 'hashed', save: jest.fn() };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(AccountService.Login('testuser', 'wrongpass')).rejects.toThrow('Sai mật khẩu');
  });
});

describe('AccountService - Register', () => {
  it('should register a new user', async () => {
    const userInput = { username: 'newuser', password: 'pass123' };
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_password');
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({ username: 'newuser', password: 'hashed_password' }),
    }));

    const result = await AccountService.Register(userInput);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'newuser' });
    expect(result.username).toBe('newuser');
    expect(result.password).toBe('hashed_password');
  });

  it('should throw error if user exists', async () => {
    User.findOne.mockResolvedValue({ username: 'newuser' });

    await expect(AccountService.Register({ username: 'newuser', password: '123456' }))
      .rejects.toThrow('username newuser đã tồn tại');
  });
});
