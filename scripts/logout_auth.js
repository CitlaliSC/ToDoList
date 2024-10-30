import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { firebaseConfig } from "../reusable_scripts/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btnLogout = document.getElementById('btnLogout');
const list = document.getElementById("list"); // Asegúrate de tener este elemento en tu HTML

btnLogout.addEventListener('click', async function () {
    try {
        await signOut(auth);
        alert("Has cerrado sesión exitosamente.");
        
        // Limpia el localStorage
        localStorage.removeItem('userUID'); // Elimina el UID
        localStorage.removeItem('tasks'); // Elimina la lista de tareas

        // Limpia el HTML de la lista de tareas
        list.innerHTML = ""; // Borra todo el contenido del elemento 'list'
        
        // Redirige al usuario
        window.location.href = "/html/index.html";
    } catch (error) {
        alert(error.message);
    }
});
