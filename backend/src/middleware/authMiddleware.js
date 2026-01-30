const admin = require('../config/firebase');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // If firebase is not initialized (e.g. no service account), fail
            if (!admin.apps.length) {
                console.error('Auth Error: Firebase Admin not initialized');
                return res.status(500).json({ success: false, error: 'Auth service not configured' });
            }

            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken; // contains uid, email, etc.
            next();
        } catch (error) {
            console.error('Auth Error Verification Failed:', error);
            res.status(401).json({ success: false, error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ success: false, error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
