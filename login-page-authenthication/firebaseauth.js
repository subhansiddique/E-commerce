
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXBJcO_aVc0Bb1_z43OWwtx6EUG1VUrWU",
  authDomain: "e-commerce-7a8a3.firebaseapp.com",
  projectId: "e-commerce-7a8a3",
  storageBucket: "e-commerce-7a8a3.appspot.com",
  messagingSenderId: "273207027630",
  appId: "1:273207027630:web:e696881beab82aa5d0ca3f",
};

// Initialize Firebase
function showMessage(message, divId) {
  var messageDiv = document.getElementById("signUpMessage");
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}
const app = initializeApp(firebaseConfig);
const signUp = document.getElementById("btn");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const email = document.getElementById("email-input-signup").value;
  const password = document.getElementById("password-input-signup").value;
  const auth = getAuth();
  const db = getFirestore();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstname: firstName,
        lastname: lastName,
      };
      showMessage("Account Created sucessfully", "signupMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "./login.html";
        })
        .catch((error) => {
          console.error("error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("Email address aleready exsist", "signupMessage");
      } else {
        showMessage("unable to create user ", "signupMessage");
      }
    });
});
