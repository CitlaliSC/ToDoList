import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { firebaseConfig } from "../reusable_scripts/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btnLogout = document.getElementById('btnLogout');
const list = document.getElementById("list");

btnLogout.addEventListener('click', async function () {
    try {
        await signOut(auth);
        alert("Has cerrado sesión exitosamente.");
        
        localStorage.removeItem('userUID');
        localStorage.removeItem('tasks');

        list.innerHTML = "";

        window.location.href = "/html/index.html";
    } catch (error) {
        alert(error.message);
    }
});
