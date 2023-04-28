const button_all = document.querySelector(".all").addEventListener("click", () => {
    window.location.href = "./index.html";
});

const button_active = document.querySelector(".active").addEventListener("click", () => {
    window.location.href = "./active.html";
});

const button_completed = document.querySelector(".completed").addEventListener("click", () => {
    window.location.href = "./completed.html";
});
const form = document.getElementById("form");
const results = document.querySelector("#task-list");
const TASKS_KEY = "tasks";
const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];

function renderTasks() {
    const activeTasks = allTasks.filter((task) => !task.isCompleted);
    const completedTasks = allTasks.filter((task) => task.isCompleted);

    if (window.location.pathname.includes("active")) {
        renderTaskList(activeTasks);
    } else if (window.location.pathname.includes("completed")) {
        renderTaskList(completedTasks);
    } else {
        renderTaskList(allTasks);
    }
}

function renderTaskList(tasks) {
    results.innerHTML = "";

    tasks.forEach((task) => {
        const div = document.createElement("div");
        div.classList.add("task");

        const label = document.createElement("label");
        label.setAttribute("for", task.id);
        label.innerText = task.task;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("id", task.id);
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = task.isCompleted;
        checkbox.addEventListener("change", () => {
            task.isCompleted = checkbox.checked;
            localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
            renderTasks();
        });

        div.append(checkbox, label);
        results.appendChild(div);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector("#input");
    const newTask = { id: (Math.random() * 1000000).toFixed(), task: input.value, isCompleted: false };
    allTasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
    renderTasks();
    input.value = "";
});

renderTasks();
