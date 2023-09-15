document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const pendingTaskList = document.getElementById("pendingTaskList");
    const completedTaskList = document.getElementById("completedTaskList");

    function createTaskElement(taskText, isCompleted = false) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <div class="task-details">
                <span>${taskText}</span>
            </div>
            <div class="task-actions">
                <button class="complete-button">Complete</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        taskItem.querySelector(".complete-button").addEventListener("click", function () {
            taskItem.querySelector(".task-actions").remove();
            taskItem.classList.add("completed-task");

            const completionDate = new Date().toLocaleString();
            const timestampElement = document.createElement("span");
            timestampElement.classList.add("task-timestamp");
            timestampElement.textContent = `Completed on ${completionDate}`;
            taskItem.querySelector(".task-details").appendChild(timestampElement);

            completedTaskList.appendChild(taskItem);
        });

        taskItem.querySelector(".delete-button").addEventListener("click", function () {
            taskContainer.remove();
        });

        taskContainer.appendChild(taskItem);

        return taskContainer;
    }

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskContainer = createTaskElement(taskText);
            pendingTaskList.appendChild(taskContainer);
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});
