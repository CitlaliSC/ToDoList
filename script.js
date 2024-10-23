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
    tasksArray.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    location.reload();
}

function displayTasks() {
    for (let i = 0; i < tasksArray.length; i++) {
        var tr = document.createElement("tr");

        var tdId = document.createElement("td");
        tdId.textContent = i + 1;
        tr.appendChild(tdId);

        var tdTask = document.createElement("td");
        tdTask.textContent = tasksArray[i];
        tr.appendChild(tdTask);
    
        var tdBtn = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.className = "btnDelete"
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
    tasksArray.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    location.reload();
}

window.onload= function() {
    displayTasks();
}