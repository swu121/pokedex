import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBV5v7TZokHjIzlJjSNreNbaqlsAGl1Dns",
    authDomain: "pokedex-a5642.firebaseapp.com",
    projectId: "pokedex-a5642",
    storageBucket: "pokedex-a5642.appspot.com",
    messagingSenderId: "21220076380",
    appId: "1:21220076380:web:03410ab538f0867dfe6f99",
    measurementId: "G-XVRXYBYD7V"
  };

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore()

export {auth, db};