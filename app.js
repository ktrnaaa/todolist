// Define UI Vars
const form = document.querySelector('.create-task-form');
const filter = document.querySelector('.filter-input');
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove or update task event
  taskList.addEventListener('click', removeOrUpdateTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element for delete
    const deleteLink = document.createElement('a');
    // Add class
    deleteLink.className = 'delete-item secondary-content';
    // Add icon html
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the delete link to li
    li.appendChild(deleteLink);
    // Create new link element for edit
    const editLink = document.createElement('a');
    // Add class
    editLink.className = 'edit-item secondary-content';
    // Add icon html
    editLink.innerHTML = '<i class="fa fa-edit"></i>';
    // Append the edit link to li
    li.appendChild(editLink);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value.trim() === '') {
    e.preventDefault();
    return null;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element for delete
  const deleteLink = document.createElement('a');
  // Add class
  deleteLink.className = 'delete-item secondary-content';
  // Add icon html
  deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the delete link to li
  li.appendChild(deleteLink);
  // Create new link element for edit
  const editLink = document.createElement('a');
  // Add class
  editLink.className = 'edit-item secondary-content';
  // Add icon html
  editLink.innerHTML = '<i class="fa fa-edit"></i>';
  // Append the edit link to li
  li.appendChild(editLink);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove or Update Task
function removeOrUpdateTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Ви впевнені, що хочете видалити це завдання?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  } else if (e.target.parentElement.classList.contains('edit-item')) {
    const editedTask = prompt('Введіть змінений текст завдання:', e.target.parentElement.parentElement.firstChild.textContent);
    if (editedTask) {
      e.target.parentElement.parentElement.firstChild.textContent = editedTask;
      // Update in LS
      updateTaskInLocalStorage(e.target.parentElement.parentElement.firstChild.textContent, editedTask);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update in LS
function updateTaskInLocalStorage(oldTask, newTask) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (task === oldTask) {
      tasks[index] = newTask;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().includes(text)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Initial tasks loading
document.addEventListener('DOMContentLoaded', getTasks);

