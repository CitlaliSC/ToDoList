// load_list.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, setDoc, doc, deleteDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "../reusable_scripts/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userUID = localStorage.getItem("userUID");
const tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

export async function saveTaskToFirestore(taskID, taskText) {
  try {
    console.log(`Guardando tarea en Firestore con ID: ${taskID}`);
    await setDoc(doc(db, "users", userUID, "tasks", taskID), {
      task: taskText
    });
    console.log(`Tarea ${taskID} guardada en Firestore`);
  } catch (error) {
    console.error("Error guardando tarea en Firestore:", error);
  }
}

export async function deleteTaskFromFirestore(taskID) {
  try {
    console.log(`Intentando eliminar documento en Firestore con ID: ${taskID}`);
    const taskRef = doc(db, "users", userUID, "tasks", taskID);
    await deleteDoc(taskRef);
    console.log("Tarea eliminada de Firestore");
  } catch (error) {
    console.error("Error eliminando tarea:", error);
  }
}

export async function getTasksFromFirestore() {
  const tasksArray = [];
  const querySnapshot = await getDocs(collection(db, "users", userUID, "tasks"));
  querySnapshot.forEach((doc) => {
    tasksArray.push({ id: doc.id, ...doc.data() });
    console.log(doc.id, " => ", doc.data());
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  return tasksArray;
}