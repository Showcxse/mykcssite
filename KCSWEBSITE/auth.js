import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth,
    signInWithEmailAndPassword,
    signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

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
const auth = getAuth(app);

const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const authForm = document.querySelector("#sign-in-form");
const signInBtn = document.querySelector("#sign-in-btn");

authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;

    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sign in successful (thank fuck): ", user);
        window.location.href = 'admindashboard.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in: ", errorCode, errorMessage);
    });
});


