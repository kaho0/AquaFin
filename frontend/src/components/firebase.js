import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2dtnK8mACPb0_VD4nJADKatxob213N2M",
  authDomain: "aquafin-99718.firebaseapp.com",
  projectId: "aquafin-99718",
  storageBucket: "aquafin-99718.appspot.com", // ✅ Fixed this
  messagingSenderId: "20571758690",
  appId: "1:20571758690:web:a8c98ae326680211a2b13b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // ✅ Fixed this
export const db = getFirestore(app);
export default app;
