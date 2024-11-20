import { saveTaskToFirestore, deleteTaskFromFirestore } from "../scripts/load_list.js";

const tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
console.log(tasksArray);

const task = document.getElementById("inpTask");
const btnAdd = document.getElementById("btnAdd");
const list = document.getElementById("list");
let offlineQueue = JSON.parse(localStorage.getItem("offlineQueue")) || [];

btnAdd.onclick = function() {
    if (task.value === "") {
        alert("El campo de la tarea no debe quedar vacío.");
    } else {
        createTask(task);
    }
}

function createTask(task) { 
    const taskID = `task_${Date.now()}`;
    const newTask = { id: taskID, task: task.value };
    
    tasksArray.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    saveOrQueueTask({ type: "add", task: newTask });
    displayTasks();
    task.value = "";
}

function clearTaskList() {
    list.innerHTML = "";
}

function createIdColumn(index) {
    const tdId = document.createElement("td");
    tdId.textContent = index + 1;
    return tdId;
}

function createTaskColumn(task) {
    const tdTask = document.createElement("td");
    tdTask.textContent = task.task;
    return tdTask;
}

function createDeleteButtonColumn() {
    const tdBtn = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "btnDelete";
    btnDelete.innerHTML = 'Eliminar';

    tdBtn.appendChild(btnDelete);
    return tdBtn;
}

function createTaskRow(task, index) {
    const tr = document.createElement("tr");
    tr.appendChild(createIdColumn(index));
    tr.appendChild(createTaskColumn(task));
    tr.appendChild(createDeleteButtonColumn());
    return tr;
}

function resetInput() {
    task.value = "";
    task.focus();
}

function displayTasks() {
    clearTaskList();

    tasksArray.forEach((task, index) => {
        const taskRow = createTaskRow(task, index);
        list.appendChild(taskRow);
    });

    resetInput();
    addingDeleteTask();
}

function addingDeleteTask() {
    const btnDelete = document.querySelectorAll(".btnDelete");
    btnDelete.forEach((deleteButton, i) => {
        deleteButton.addEventListener("click", () => { deleteTask(i) });
    });
}

async function deleteTask(i) {
    const taskID = tasksArray[i].id;
    
    tasksArray.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    saveOrQueueTask({ type: "delete", taskID });

    displayTasks();
}

function saveOrQueueTask(action) {
    if (navigator.onLine) {
        if (action.type === "add") {
            saveTaskToFirestore(action.task.id, action.task.task);
        } else if (action.type === "delete") {
            deleteTaskFromFirestore(action.taskID);
        }
    } else {
        offlineQueue.push(action);
        localStorage.setItem("offlineQueue", JSON.stringify(offlineQueue));
    }
}

window.addEventListener("online", processOfflineQueue);

async function processOfflineQueue() {
    if (offlineQueue.length === 0) return;
    window.alert("Reconectado. Guardando los cambios pendientes...");

    for (let i = 0; i < offlineQueue.length; i++) {
        const action = offlineQueue[i];
        try {
            if (action.type === "add") {
                await saveTaskToFirestore(action.task.id, action.task.task);
            } else if (action.type === "delete") {
                await deleteTaskFromFirestore(action.taskID);
            }
        } catch (error) {
            console.error(`Error al procesar la acción offline ${action.type}:`, error);
            window.alert("Ocurrió un error al guardar algunos cambios offline.");
            return;
        }
    }

    offlineQueue = [];
    localStorage.removeItem("offlineQueue");
    window.alert("Cambios guardados correctamente.");
}

window.onload = function() {
    displayTasks();
}