const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');

describe('User Controller', () => {
    beforeAll(async () => {
        await User.deleteMany(); // Clean up before tests
    });

    test('User registration', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    test('User login', async () => {
        await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });
});