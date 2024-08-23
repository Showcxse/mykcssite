import { db, storage, auth } from './firebase-setup.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import cssbeautify from './assets/libs/cssbeautify/cssbeautify.js';

function normalizePath(path) {
    path = path.replace(/^.\/+pages\/|\/+$/g, '');
    path = path.replace(/\.$/, '');

    if (path === 'index.html' || path === 'index') {
        return 'home';
    }

    path = path.replace(/\.html$/, '');
    console.log('Final path:', path);
    return path;
}

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'adminlogin.html';
    }).catch((error) => {
        console.error('Logout error: ', error);
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Admin is signed in: ", user);
    } else {
        console.log("No admin is signed in");
        window.location.href = 'index.html';
    }
});

const pageSelect = document.querySelector('#page-select');
const contentEditArea = document.querySelector('#content-edit-area');
const saveChangesBtn = document.querySelector('#save-changes-btn');
const validateHtmlBtn = document.querySelector('#validate-html-btn');

pageSelect.addEventListener('change', async () => {
    const page = pageSelect.value;
    const normalizedPage = normalizePath(page);
    const docRef = doc(db, "pages", normalizedPage);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            contentEditArea.value = docSnap.data().content;
        } else {
            console.error('No such document!');
            alert(`Page ${normalizedPage} not found in the database!`);
        }
    } catch (error) {
        console.log(`page not found: ${normalizedPage}`);
        console.error("Error getting document:", error);
    } 
});

function validateHTML() {
    const htmlBox = document.querySelector("#content-edit-area");
    let htmlContent = htmlBox.value;

    const formattedHTML = html_beautify(htmlContent, {
        indent_size: 2,
        wrap_line_length: 80,
        preserve_newlines: true,
        max_preserve_newlines: 2
    });

    htmlBox.value = formattedHTML;

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        if (doc.getElementsByTagName('parsererror').length > 0 ) {
            alert('Fix yo html syntax');
        } else {
            alert('HTML is valid');
        }
    } catch (error) {
        alert(`Error validating HTML (Casey's fault)`);
    }
}


saveChangesBtn.addEventListener('click', async () => {
    const page = pageSelect.value;
    const normalizedPage = normalizePath(page);
    const newContent = contentEditArea.value;
    const docRef = doc(db, "pages", normalizedPage);
    try {
        await setDoc(docRef, { content: newContent });
        alert('Changes Saved!');    
    } catch (error) {
        console.error("Error saving document:", error);
    }
});

validateHtmlBtn.addEventListener('click', validateHTML);

function validateCSS(css) {
    const cssRegex = /[^{}]+{[^{}]*}/g;
    const matches = css.match(cssRegex);
    if (!matches) {
        throw new Error('Invalid CSS syntax');
    }
}

const cssEditor = document.querySelector('#css-editor');
const validateCssBtn = document.querySelector('#validate-css-btn');
const saveCssBtn = document.querySelector('#save-css-btn');

async function loadCSS() {
    try {
        const cssDocRef = doc(db, "styles", "style.css");
        const cssDoc = await getDoc(cssDocRef);
        if (cssDoc.exists()) {
            cssEditor.value = cssDoc.data().content;
        } else {
            console.error("No CSS document found");
        }
    } catch (error) {
        console.error("Error loading CSS:", error);
    }
}

validateCssBtn.addEventListener('click', () => {
    const cssContent = cssEditor.value;
    try {
        validateCSS(cssContent);
        alert('CSS is valid!');
    } catch (error) {
        alert('CSS is invalid: ' + error.message);
    }
});

saveCssBtn.addEventListener('click', async () => {
    const cssContent = cssEditor.value;
    const beautifiedCss = cssbeautify(cssContent);
    const docRef = doc(db, "styles", "style.css");
    try {
        await setDoc(docRef, { content: beautifiedCss });
        alert('CSS changes saved!');    
    } catch (error) {
        console.error("Error saving CSS:", error);
    }
});

const imageUpload = document.querySelector('#image-upload');
const imagePreview = document.querySelector('#image-preview');
const uploadImageBtn = document.querySelector('#upload-image-btn');

uploadImageBtn.addEventListener('click', () => {
    const file = imageUpload.files[0];
    if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                displayImage(url);
            }).catch((error) => {
                console.error('Error getting download URL: ', error);
            });
        }).catch((error) => {
            console.error('Error uploading file: ', error);
        });
    } else {
        alert('Select an image to upload.');
    }
});

function displayImage(url, imageName) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('img_container');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('img_checkbox');
    checkbox.value = imageName;
    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.className = 'uploaded_image';
    imgElement.addEventListener('click', function () {
        openImagePopup(url);
    });
    imageContainer.appendChild(checkbox);
    imageContainer.appendChild(imgElement);
    imagePreview.appendChild(imageContainer);
}

function loadAllImages() {
    imagePreview.innerHTML = '';
    const imagesRef = ref(storage, 'images/');
    listAll(imagesRef).then((result) => {
        result.items.forEach((imageRef) => {
            getDownloadURL(imageRef).then((url) => {
                const imageName = imageRef.name;
                displayImage(url, imageName);
            });
        });
    }).catch((error) => {
        console.error('Error showing images: ', error);
    });
}

function deleteSelectedImages() {
    const selectedImages = document.querySelectorAll('.img_checkbox:checked');

    if (selectedImages.length === 0) {
        alert('No images selected');
        return;
    }

    selectedImages.forEach((checkbox) => {
        const imgRef = ref(storage, `images/${checkbox.value}`);
        deleteObject(imgRef).then(() => {
            console.log(`File ${checkbox.value} deleted successfully`);
            checkbox.closest('.img_container').remove();
        }).catch((error) => {
            console.error(`Error deleting image ${checkbox.value}:`, error);
        })
    })
}

const deleteBtn = document.querySelector('#delete-selected');
deleteBtn.addEventListener('click', deleteSelectedImages);

function openImagePopup(imageSrc) {
    const popupBackground = document.querySelector('#image-popup-background');
    const popUpImage = document.getElementById('image-popup');

    popUpImage.src = imageSrc;
    popupBackground.style.display = 'flex';
}

function closeImagePopup() {
    const popupBackground = document.querySelector('#image-popup-background');
    popupBackground.style.display = 'none';
}

document.querySelector('#image-popup-background').addEventListener('click', closeImagePopup);

loadAllImages();
loadCSS();