import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAGzcLtpACZdiNnFnQq83iiu1DTTtUOOZc",
    authDomain: "kcs-website-e2909.firebaseapp.com",
    databaseURL: "https://kcs-website-e2909-default-rtdb.firebaseio.com",
    projectId: "kcs-website-e2909",
    storageBucket: "kcs-website-e2909.appspot.com",
    messagingSenderId: "44532491992",
    appId: "1:44532491992:web:986fc4403b472eeb1f99ad",
    measurementId: "G-HDNR4CQYD4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth};