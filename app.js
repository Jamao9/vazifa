document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = "";
}

function createTaskElement(text, isCompleted = false) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
  const taskElements = document.querySelectorAll("#taskList li");
  const tasks = Array.from(taskElements).map(li => ({
    text: li.firstChild.textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}
