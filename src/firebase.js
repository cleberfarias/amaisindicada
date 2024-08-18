// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD7AStofE3-3zvUzRQIZSQ-mSc7hbxPALI",
    authDomain: "bd-indicada.firebaseapp.com",
    databaseURL: "https://bd-indicada-default-rtdb.firebaseio.com",
    projectId: "bd-indicada",
    storageBucket: "bd-indicada.appspot.com",
    messagingSenderId: "822980033617",
    appId: "1:822980033617:web:a2280936dbb0ec1c460c70"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação
const auth = getAuth(app);

export { auth };
