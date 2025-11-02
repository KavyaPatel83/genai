const express = require('express');
const router = express.Router();

// Mock user data (replace with actual database operations)
let users = [];
let userIdCounter = 1;

// POST register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, profession } = req.body;

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create new user (in real app, hash password)
        const newUser = {
            id: userIdCounter++.toString(),
            name,
            email,
            password, // In real app, hash this password
            profession,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        // Generate simple token (in real app, use JWT)
        const token = `mock-token-${newUser.id}-${Date.now()}`;

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: userWithoutPassword,
                token,
                expiresIn: '7 days'
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
});

// POST login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password (in real app, use bcrypt)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate simple token
        const token = `mock-token-${user.id}-${Date.now()}`;

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: userWithoutPassword,
                token,
                expiresIn: '7 days'
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
});

// GET user profile (mock - in real app, use authentication middleware)
router.get('/profile', (req, res) => {
    try {
        // Mock user for demo (in real app, get from JWT token)
        const mockUser = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            profession: 'Software Developer'
        };

        res.json({
            success: true,
            data: {
                user: mockUser
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

module.exports = router;
