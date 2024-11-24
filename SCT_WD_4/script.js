const taskInput = document.getElementById('task-input');
const taskDatetime = document.getElementById('task-datetime');
const addTaskButton = document.getElementById('add-task-button');
const tasksContainer = document.getElementById('tasks-container');

// Add Task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = taskDatetime.value;

  if (!taskText) {
    alert('Please enter a task.');
    return;
  }

  const taskItem = createTaskElement(taskText, dueDate);
  tasksContainer.appendChild(taskItem);

  taskInput.value = '';
  taskDatetime.value = '';
});

// Create Task Element
function createTaskElement(text, dueDate) {
  const li = document.createElement('li');

  // Task Content
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.innerHTML = `<span>${text}</span>${dueDate ? ` <small>Due: ${dueDate}</small>` : ''}`;
  li.appendChild(taskContent);

  // Actions
  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  // Complete Button
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.classList.add('complete');
  completeButton.addEventListener('click', () => {
    li.classList.toggle('completed');
  });
  taskActions.appendChild(completeButton);

  // Edit Button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit');
  editButton.addEventListener('click', () => {
    const newTaskText = prompt('Edit your task:', text);
    const newDueDate = prompt('Edit your due date (YYYY-MM-DDTHH:MM):', dueDate);

    if (newTaskText !== null) {
      taskContent.innerHTML = `<span>${newTaskText}</span>${newDueDate ? ` <small>Due: ${newDueDate}</small>` : ''}`;
    }
  });
  taskActions.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', () => {
    tasksContainer.removeChild(li);
  });
  taskActions.appendChild(deleteButton);

  li.appendChild(taskActions);

  return li;
}
