const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
let serviceAccount;

try {
    // Check if path is absolute or relative
    if (path.isAbsolute(serviceAccountPath)) {
        serviceAccount = require(serviceAccountPath);
    } else {
        serviceAccount = require(path.join(process.cwd(), serviceAccountPath));
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin Initialized');
} catch (error) {
    console.warn('Firebase Admin Initialization Failed. Auth will not work until serviceAccountKey.json is provided.');
    console.error(error.message);
}

module.exports = admin;
