import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importar getAuth correctamente

const firebaseConfig = {
    apiKey: "AIzaSyCUgSz7_ob6KpOr8P3TbHC_uLTMp3zghmI",
    authDomain: "realtime2025-ed068.firebaseapp.com",
    projectId: "realtime2025-ed068",
    storageBucket: "realtime2025-ed068.firebasestorage.app",
    messagingSenderId: "1037630192826",
    appId: "1:1037630192826:web:8d033d68235a027d3b1683",
    measurementId: "G-JWCHMCQ9ER"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Obtiene y exporta la instancia de auth
const auth = getAuth(app);

export { auth };
// Exportar funciones y Firestore correctamente
export { db, collection, getDocs, addDoc, deleteDoc };
