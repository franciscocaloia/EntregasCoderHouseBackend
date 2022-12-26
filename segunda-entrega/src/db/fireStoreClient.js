import admin from "firebase-admin";
import { FIREBASE_CREDENTIALS } from "../../config/cfg.js";
admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS),
});
export const firestoreDB = admin.firestore();
