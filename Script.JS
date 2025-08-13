document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    const task = { text: taskText, completed: false };
    saveTask(task);

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
}

function handleTaskClick(e) {
    if (e.target.tagName === "SPAN") {
        const li = e.target.parentElement;
        li.classList.toggle("completed");
        updateLocalStorage();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        updateLocalStorage();
    }
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(taskEl => {
        tasks.push({
            text: taskEl.querySelector("span").textContent,
            completed: taskEl.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}