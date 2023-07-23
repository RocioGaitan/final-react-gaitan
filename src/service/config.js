import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyCAuOt5u0VsaW1w2Ohf2hIEnevWvxZhnuU",
  authDomain: "euphoria-lenceria.firebaseapp.com",
  projectId: "euphoria-lenceria",
  storageBucket: "euphoria-lenceria.appspot.com",
  messagingSenderId: "153219205985",
  appId: "1:153219205985:web:b3ae87894a5ef6a47b5320"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  