import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import cssbeautify from './assets/libs/cssbeautify/cssbeautify.js';


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
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('#logout-btn');
    const saveChangesBtn = document.querySelector('#save-changes-btn');
    const validateCssBtn = document.querySelector('#validate-css-btn');
    const saveCssBtn = document.querySelector('#save-css-btn');
    const imageUpload = document.querySelector('#image-upload');
    const uploadImageBtn = document.querySelector('#upload-image-btn');
    const pageSelect = document.querySelector('#page-select');
    const contentEditArea = document.querySelector('#content-edit-area');
    const cssEditor = document.querySelector('#css-editor');
    const imagePreview = document.querySelector('#image-preview');


    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = './adminlogin.html';
            }).catch((error) => {
                console.error('Error logging out: ', error);
            });
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Admin is signed in: ", user);
        } else {
            console.log("No admin is signed in");
            window.location.href = 'index.html';
        }
    });

    if (pageSelect && contentEditArea) {
        pageSelect.addEventListener('change', async () => {
            const page = pageSelect.value;
            const pageRef = doc(db, 'pages', page);
            const pageSnap = await getDoc(pageRef);

            if (pageSnap.exists()) {
                contentEditArea.innerHTML = pageSnap.data().content;
            } else {
                console.log("Document does not exist");
            }
        });

        if (saveChangesBtn) {
            saveChangesBtn.addEventListener('click', async () => {
                const page = pageSelect.value;
                const content = contentEditArea.innerHTML;
                await setDoc(doc(db, 'pages', page), { content });
                alert('Changes saved!');
            });
        }
    }
})






