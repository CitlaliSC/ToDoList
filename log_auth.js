import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvQCDib0kpLSSb-8zkC8bPpZdNzRHqLYY",
  authDomain: "todolist-b3a95.firebaseapp.com",
  projectId: "todolist-b3a95",
  storageBucket: "todolist-b3a95.appspot.com",
  messagingSenderId: "1087651724866",
  appId: "1:1087651724866:web:4918f6117e16fa0486f7db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const submit = document.getElementById('submit');

submit.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      window.location.href = "list.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});