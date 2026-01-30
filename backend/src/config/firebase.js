const admin = require("firebase-admin");

try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing");
  }

  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase Admin Initialized");
} catch (error) {
  console.warn(
    "Firebase Admin Initialization Failed. Auth will not work."
  );
  console.error(error.message);
}

module.exports = admin;
