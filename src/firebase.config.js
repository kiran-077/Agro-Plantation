
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCUneMk_XIeeOJM_AMwXeaGjrMNe-XNVNQ",
  authDomain: "todallatfinal.firebaseapp.com",
  projectId: "todallatfinal",
  storageBucket: "todallatfinal.appspot.com",
  messagingSenderId: "1057709836757",
  appId: "1:1057709836757:web:7093a9008ecee014aa155c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app
