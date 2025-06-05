document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const completedList = document.getElementById("completed-tasks");

    function showToast(message, type = "info") {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.className = "toast " + type;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add("visible");
        }, 10);
        setTimeout(() => {
            toast.classList.remove("visible");
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2500);
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createTaskElement(task, index) {
        const li = document.createElement("li");
        li.className = "task-item fade-in" + (task.completed ? " completed" : "");

        const span = document.createElement("span");
        span.textContent = task.text;

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = task.text;
        editInput.style.display = "none";

        const actionsDiv = document.createElement("div");

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed ? "Annuler" : "Terminer";
        toggleBtn.onclick = () => {
            toggleTask(index);
            showToast(task.completed ? "Tâche réactivée" : "Tâche terminée", "success");
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.onclick = () => {
            deleteTask(index);
            showToast("Tâche supprimée", "error");
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Modifier";
        editBtn.onclick = () => {
            span.style.display = "none";
            editInput.style.display = "inline-block";
            editInput.focus();
            editBtn.style.display = "none";
            saveEditBtn.style.display = "inline-block";
        };

        const saveEditBtn = document.createElement("button");
        saveEditBtn.textContent = "✅";
        saveEditBtn.style.display = "none";
        saveEditBtn.onclick = () => {
            const newText = editInput.value.trim();
            if (newText) {
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks[index].text = newText;
                saveTasks(tasks);
                loadTasks();
                showToast("Tâche modifiée", "success");
            }
        };

        actionsDiv.append(toggleBtn, deleteBtn, editBtn, saveEditBtn);
        li.append(span, editInput, actionsDiv);
        return li;
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        completedList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            if (task.completed) {
                completedList.appendChild(taskElement);
            } else {
                taskList.appendChild(taskElement);
            }
        });
    }

    window.toggleTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        loadTasks();
    };

    window.deleteTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    };

    addButton.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (!text) return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        taskInput.value = "";
        loadTasks();
        showToast("Tâche ajoutée !", "info");
    });

    loadTasks();
});
