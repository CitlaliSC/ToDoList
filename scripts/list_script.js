import { saveTaskToFirestore, deleteTaskFromFirestore } from "/scripts/load_list.js";

const tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
console.log(tasksArray);

var task = document.getElementById("inpTask");
var btnAdd = document.getElementById("btnAdd");
var list = document.getElementById("list");

btnAdd.onclick = function() {
    if (task.value === "") {
        alert("El campo de la tarea no debe quedar vacío.");
    } else {
        createTask(task);
    }
}

function createTask(task) { 
    const taskID = `task_${Date.now()}`;
    const newTask = { id: taskID, text: task.value };
    
    tasksArray.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    saveTaskToFirestore(taskID, task.value);
    displayTasks();
    task.value = "";
  }

function displayTasks() {
    list.innerHTML = "";

    // dividir

    for (let i = 0; i < tasksArray.length; i++) {
        var tr = document.createElement("tr");

        var tdId = document.createElement("td");
        tdId.textContent = i + 1;
        tr.appendChild(tdId);

        var tdTask = document.createElement("td");
        tdTask.textContent = tasksArray[i].text;
        tr.appendChild(tdTask);
    
        var tdBtn = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.className = "btnDelete";
        btnDelete.innerHTML = 'Eliminar';

        tdBtn.appendChild(btnDelete);
        tr.appendChild(tdBtn);
        list.appendChild(tr);

        inpTask.value = "";
        inpTask.focus();
    }

    addingDeleteTask();
}

function addingDeleteTask() {
    let btnDelete = document.querySelectorAll(".btnDelete")
    btnDelete.forEach((deleteButton, i) => {
        deleteButton.addEventListener("click", () => { deleteTask(i) })
    })
}

function deleteTask(i) {
    const taskID = tasksArray[i].id;
    console.log(`Eliminando tarea con ID: ${taskID}`);
    tasksArray.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    deleteTaskFromFirestore(taskID);
}


window.onload = function() {
    displayTasks();
}
