import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBHT_dGawXla76kYj6eUesyOYCleqeCu5w",
  databaseURL:
    "https://embedded-7bf4c-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "embedded-7bf4c",
};

const app = initializeApp(firebaseConfig);

// Export specific services so they can be imported anywhere
export const auth = getAuth(app);
export const db = getDatabase(app, firebaseConfig.databaseURL);
export default app;
