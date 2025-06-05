document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task-item" + (task.completed ? " completed" : "");
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? "Annuler" : "Terminer"}</button>
                    <button onclick="deleteTask(${index})">Supprimer</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.toggleTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    window.deleteTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    addButton.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (!text) return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    });

    loadTasks();
});