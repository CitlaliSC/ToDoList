import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { firebaseConfig } from "../reusable_scripts/firebaseConfig.js";
import { getTasksFromFirestore } from "./load_list.js";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


const btnGoogle = document.getElementById('google-login');
btnGoogle.addEventListener("click", async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('userUID', user.uid);
    
    await getTasksFromFirestore();

    window.location.href = "list.html"; // Redirige a la lista de tareas
  } catch (error) {
    console.error("Error en la autenticación con Google:", error);
    alert(error.message);
  }
});

const btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener("click", async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    try {
        if (password === confirmPassword) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date()
            });
    
            localStorage.setItem('userUID', user.uid);
            window.location.href = "list.html";
        } else {
            window.alert("Las contraseñas no coinciden");
        }
    } catch (error) {
        alert(error.message);
    }
});
