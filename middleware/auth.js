// Simple authentication middleware for demo purposes
// In production, use proper JWT verification

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            // For demo purposes, create a mock user
            // In production, return 401 error
            req.user = {
                id: 'demo-user-id',
                name: 'Demo User',
                email: 'demo@example.com'
            };
            return next();
        }

        // Mock token verification
        // In production, verify JWT token here
        if (token.startsWith('mock-token-')) {
            req.user = {
                id: 'demo-user-id',
                name: 'Demo User',
                email: 'demo@example.com'
            };
            return next();
        }

        // If token is invalid
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

module.exports = {
    authenticate
};