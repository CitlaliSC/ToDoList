// load_list.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, setDoc, doc, deleteDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "../reusable_scripts/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userUID = localStorage.getItem("userUID");

export async function saveTaskToFirestore(taskID, taskText) {
  try {
    await setDoc(doc(db, "users", userUID, "tasks", taskID), {
      task: taskText
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteTaskFromFirestore(taskID) {
  try {
    const taskRef = doc(db, "users", userUID, "tasks", taskID);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getTasksFromFirestore() {
  const userUID = localStorage.getItem("userUID");
  const tasksArray = [];

  const querySnapshot = await getDocs(collection(db, "users", userUID, "tasks"));
  querySnapshot.forEach((doc) => {
    tasksArray.push({ id: doc.id, ...doc.data() });
    console.log(doc.id, " => ", doc.data());
  });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  return tasksArray;
}