const taskInput = document.getElementById("input");
const addButton = document.getElementById("addButton");
const sortButton = document.getElementById("sortButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);
sortButton.addEventListener("click", sortTasks);
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const task = taskInput.value.trim();
  if (task === "") {
    return;
  }
  const listItem = createTaskListItem(task);
  taskList.appendChild(listItem);

  saveTasks();

  taskInput.value = "";
}

function createTaskListItem(task) {
  const listItem = document.createElement("li");

  const checklistButton = document.createElement("span");
  checklistButton.innerHTML = "&#x2713;"; // Unicode for checkmark icon
  checklistButton.classList.add("checklist-icon");
  checklistButton.addEventListener("click", toggleChecklist);
  listItem.appendChild(checklistButton);

  const taskText = document.createElement("span");
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "&#x1F5D1;"; // Unicode for trash can icon
  deleteButton.classList.add("delete-icon");
  deleteButton.addEventListener("click", deleteTask);
  listItem.appendChild(deleteButton);

  return listItem;
}

function deleteTask(event) {
  const listItem = event.target.parentElement;
  taskList.removeChild(listItem);
  saveTasks();
}

function toggleChecklist(event) {
  const listItem = event.target.parentElement;
  listItem.classList.toggle("checked");
  //    listItem.style.textDecoration = "line-through"

  saveTasks();
}

function sortTasks() {
  const tasks = Array.from(taskList.children);
  tasks.sort((a, b) => {
    return a.firstChild.textContent.localeCompare(b.firstChild.textContent);
  });
  for (const task of tasks) {
    taskList.appendChild(task);
  }
}

// Function to save tasks

function saveTasks() {
  const tasks = Array.from(taskList.children).map((item) => {
    return {
      text: item.firstChild.textContent,
      checked: item.classList.contains("checked"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) {
    return;
  }
  const tasks = JSON.parse(savedTasks);
  tasks.forEach((task) => {
    const listItem = createTaskListItem(task.text);
    if (task.checked) {
      listItem.classList.add("checked");
    }
    taskList.appendChild(listItem);
  });
}
