var inpTask = document.getElementById("inpTask");
var btnAdd = document.getElementById("btnAdd");
var list = document.getElementById("list");

var total = 1;

btnAdd.onclick = function() {
    var task = inpTask.value;

    if (task === "") {
        alert("El campo de la tarea no debe quedar vacío.");
    } else {
        var tr = document.createElement("tr");
    
        var tdi = document.createElement("td");
        tdi.textContent = total;
        tr.appendChild(tdi);
    
        var tdTask = document.createElement("td");
        tdTask.textContent = task;
        tr.appendChild(tdTask);
    
        var tdBtn = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.innerHTML = 'Eliminar';
        
        btnDelete.onclick = function() {
            tr.remove();
        }
        tdBtn.appendChild(btnDelete);
        tr.appendChild(tdBtn);
        list.appendChild(tr);
    
        total++;
        inpTask.value = "";
        inpTask.focus();
    }
}    