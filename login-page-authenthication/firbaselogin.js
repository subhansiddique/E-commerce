
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
const logIn = document.getElementById("btn-log-in");
logIn.addEventListener("click", () => {
  event.preventDefault();
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("log in sucessfull", "signUpMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "./index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        showMessage("Incorrect Email or passworsd", "signUpMessage");
      } else {
        showMessage("account does not exsisit", "signUpMessage");
      }
    });
});
