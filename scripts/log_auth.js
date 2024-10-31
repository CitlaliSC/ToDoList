import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { firebaseConfig } from "../reusable_scripts/firebaseConfig.js";
import { getTasksFromFirestore } from "./load_list.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener("click", async function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('userUID', user.uid);
    
    await getTasksFromFirestore();

    window.location.href = "/html/list.html";
  } catch (error) {
    const errorMessage = error.message;
    alert(errorMessage);
  }
});