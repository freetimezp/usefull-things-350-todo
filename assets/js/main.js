document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.querySelector("#inputBox");
    const addBtn = document.querySelector("#addBtn");
    const list = document.querySelector("#list");

    const totalTasks = document.querySelector("#totalTasks");
    const completedTasks = document.querySelector("#completedTasks");
    const pendingTasks = document.querySelector("#pendingTasks");

    /* =========================
       STORAGE
    ========================= */
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    /* =========================
       SAVE TASKS
    ========================= */
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    /* =========================
       UPDATE STATS
    ========================= */
    const updateStats = () => {
        totalTasks.textContent = tasks.length;

        const completed = tasks.filter((task) => task.done).length;

        completedTasks.textContent = completed;

        pendingTasks.textContent = tasks.length - completed;
    };

    /* =========================
       RENDER TASKS
    ========================= */
    const renderTasks = () => {
        list.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");

            if (task.done) {
                listItem.classList.add("done");
            }

            listItem.innerHTML = `
                <span>${task.text}</span>
                <i></i>
            `;

            /* Toggle Done */
            listItem.addEventListener("click", function (e) {
                if (e.target.tagName !== "I") {
                    tasks[index].done = !tasks[index].done;

                    saveTasks();
                    renderTasks();
                }
            });

            /* Delete */
            listItem.querySelector("i").addEventListener("click", function () {
                listItem.style.transform = "translateX(120px)";

                listItem.style.opacity = "0";

                setTimeout(() => {
                    tasks.splice(index, 1);

                    saveTasks();
                    renderTasks();
                }, 300);
            });

            list.appendChild(listItem);
        });

        updateStats();
    };

    /* =========================
       ADD TASK
    ========================= */
    const addItem = (text) => {
        if (text.trim() === "") return;

        tasks.push({
            text: text,
            done: false,
            createdAt: new Date().toISOString(),
        });

        saveTasks();
        renderTasks();
    };

    /* =========================
       ENTER KEY
    ========================= */
    inputBox.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addItem(this.value);

            this.value = "";
        }
    });

    /* =========================
       BUTTON
    ========================= */
    addBtn.addEventListener("click", () => {
        addItem(inputBox.value);

        inputBox.value = "";
        inputBox.focus();
    });

    /* =========================
       INIT
    ========================= */
    renderTasks();
});
