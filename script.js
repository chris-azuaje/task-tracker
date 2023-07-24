"use strict";

const addItemButton = document.querySelector("#addItemButton");
const newItemInput = document.querySelector("#newItemInput");
const todoList = document.querySelector("#todoList");

document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    todoList.innerHTML = savedTasks;
    attachEventListeners();
  }
});

addItemButton.addEventListener("click", function () {
  const newItemText = newItemInput.value;
  if (newItemText) {
    const newItem = createTaskElement(newItemText);
    todoList.appendChild(newItem);
    newItemInput.value = "";

    saveTasks();
  }
});

function createTaskElement(taskText) {
  const newItem = document.createElement("li");
  const newLabel = document.createElement("label");
  newLabel.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", function () {
    todoList.removeChild(newItem);
    saveTasks();
  });

  newLabel.addEventListener("click", function () {
    toggleTaskCompletion(newItem);
    saveTasks();
  });

  newLabel.addEventListener("mouseenter", function () {
    this.style.cursor = "pointer";
  });

  newItem.appendChild(newLabel);
  newItem.appendChild(deleteButton);

  return newItem;
}

function toggleTaskCompletion(taskItem) {
  taskItem.classList.toggle("completed");
}

function attachEventListeners() {
  const taskItems = todoList.querySelectorAll("li");
  taskItems.forEach(function (taskItem) {
    const deleteButton = taskItem.querySelector("button");
    const label = taskItem.querySelector("label");

    deleteButton.addEventListener("click", function () {
      todoList.removeChild(taskItem);
      saveTasks();
    });

    label.addEventListener("click", function () {
      toggleTaskCompletion(taskItem);
      saveTasks();
    });

    label.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer";
    });
  });
}

function saveTasks() {
  localStorage.setItem("tasks", todoList.innerHTML);
}
