document.addEventListener("DOMContentLoaded", loadTasks);

const addTaskButton = document.getElementById("addTask");
const saveTasksButton = document.getElementById("saveTasks");
const clearTasksButton = document.getElementById("clearTasks");
const showImportantButton = document.getElementById("showImportant");
const showSavedButton = document.getElementById("showSaved");

addTaskButton.addEventListener("click", addTask);
saveTasksButton.addEventListener("click", saveTasks);
clearTasksButton.addEventListener("click", clearAllTasks);
showImportantButton.addEventListener("click", filterImportant);
showSavedButton.addEventListener("click", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `
        ${taskText} 
        <div class="task-buttons">
            <button class="mark-important" onclick="markImportant(this)">★</button>
            <button class="remove-btn" onclick="removeTask(this)">Remove</button>
        </div>`;
    document.getElementById("taskList").appendChild(li);
    input.value = "";
    saveTasks();
}

function markImportant(button) {
    let task = button.parentElement.parentElement;
    task.classList.toggle("important");
    saveTasks();
}

function removeTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent.trim(),
            important: li.classList.contains("important")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    document.getElementById("taskList").innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${task.text} 
            <div class="task-buttons">
                <button class="mark-important" onclick="markImportant(this)">★</button>
                <button class="remove-btn" onclick="removeTask(this)">Remove</button>
            </div>`;
        if (task.important) li.classList.add("important");
        document.getElementById("taskList").appendChild(li);
    });
}

function clearAllTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}

function filterImportant() {
    document.querySelectorAll("#taskList li").forEach(li => {
        li.style.display = li.classList.contains("important") ? "flex" : "none";
    });
}
