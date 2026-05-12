/**
 * Unit Tests for Authentication API
 * Tests login and registration functionality
 */

import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as registerHandler } from '@/app/api/auth/register/route';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    riderProfile: {
      create: jest.fn(),
    },
  },
}));

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => Promise.resolve('hashedPassword123')),
  compare: jest.fn(),
}));

// Mock JWT
jest.mock('@/lib/jwt', () => ({
  signToken: jest.fn(() => 'mock-jwt-token'),
}));

describe('Authentication API - Unit Tests', () => {
  describe('POST /api/auth/login', () => {
    it('should return 400 if email is missing', async () => {
      const request = {
        json: async () => ({ password: 'test123', role: 'CUSTOMER' }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('required');
    });

    it('should return 400 if password is missing', async () => {
      const request = {
        json: async () => ({ email: 'test@example.com', role: 'CUSTOMER' }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('required');
    });

    it('should return 400 if role is missing', async () => {
      const request = {
        json: async () => ({ email: 'test@example.com', password: 'test123' }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('required');
    });

    it('should return 401 if user does not exist', async () => {
      const prisma = require('@/lib/prisma').default;
      prisma.user.findUnique.mockResolvedValue(null);

      const request = {
        json: async () => ({
          email: 'nonexistent@example.com',
          password: 'test123',
          role: 'CUSTOMER',
        }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toContain('Invalid');
    });

    it('should return 401 if role does not match', async () => {
      const prisma = require('@/lib/prisma').default;
      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        role: 'CUSTOMER',
        password: 'hashedPassword',
      });

      const request = {
        json: async () => ({
          email: 'test@example.com',
          password: 'test123',
          role: 'ADMIN',
        }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toContain('not registered as');
    });

    it('should return 401 if password is incorrect', async () => {
      const prisma = require('@/lib/prisma').default;
      const bcrypt = require('bcryptjs');

      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        role: 'CUSTOMER',
        password: 'hashedPassword',
      });

      bcrypt.compare.mockResolvedValue(false);

      const request = {
        json: async () => ({
          email: 'test@example.com',
          password: 'wrongpassword',
          role: 'CUSTOMER',
        }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.message).toContain('Invalid');
    });

    it('should return 200 and token on successful login', async () => {
      const prisma = require('@/lib/prisma').default;
      const bcrypt = require('bcryptjs');

      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'CUSTOMER',
        password: 'hashedPassword',
      });

      bcrypt.compare.mockResolvedValue(true);

      const request = {
        json: async () => ({
          email: 'test@example.com',
          password: 'correctpassword',
          role: 'CUSTOMER',
        }),
      };

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Login successful');
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe('test@example.com');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 if email is missing', async () => {
      const request = {
        json: async () => ({
          name: 'Test User',
          password: 'test123',
          role: 'CUSTOMER',
        }),
      };

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('required');
    });

    it('should return 400 if password is missing', async () => {
      const request = {
        json: async () => ({
          email: 'test@example.com',
          name: 'Test User',
          role: 'CUSTOMER',
        }),
      };

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toContain('required');
    });

    it('should return 409 if user already exists', async () => {
      const prisma = require('@/lib/prisma').default;
      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'existing@example.com',
      });

      const request = {
        json: async () => ({
          email: 'existing@example.com',
          name: 'Test User',
          password: 'test123',
          role: 'CUSTOMER',
        }),
      };

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.message).toContain('already exists');
    });

    it('should create customer successfully', async () => {
      const prisma = require('@/lib/prisma').default;
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({
        id: '1',
        email: 'newcustomer@example.com',
        name: 'New Customer',
        role: 'CUSTOMER',
      });

      const request = {
        json: async () => ({
          email: 'newcustomer@example.com',
          name: 'New Customer',
          password: 'test123',
          role: 'CUSTOMER',
        }),
      };

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toContain('successful');
      expect(data.user.role).toBe('CUSTOMER');
    });
  });
});
