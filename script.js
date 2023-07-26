"use strict";

const addItemButton = document.querySelector("#addItemButton");
const newItemInput = document.querySelector("#newItemInput");
const todoList = document.querySelector("#todoList");

// Loads the previously saved tasks
document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    todoList.innerHTML = savedTasks;
    attachEventListeners();
  }
});

// Adds todo item and removes text from input
const addItem = function () {
  const newItemText = newItemInput.value;
  if (newItemText) {
    const newItem = createTaskElement(newItemText);
    todoList.appendChild(newItem);
    newItemInput.value = "";
    saveTasks();
  }
};

addItemButton.addEventListener("click", addItem);
newItemInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addItemButton.click();
  }
});

// Created todo item and a functional delete button
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
    const li = document.querySelectorAll("li");
    console.log(li);

    deleteButton.addEventListener("click", function () {
      todoList.removeChild(taskItem);
      saveTasks();
    });

    const completedTask = function () {
      if (li.classList.contains("completed")) {
        console.log("true");
        label.style.textDecoration = "line-through";
      } else {
        console.log("false");
        label.style.textDecoration = "none";
      }
    };

    label.addEventListener("click", function () {
      toggleTaskCompletion(taskItem);
      completedTask();
      saveTasks();
    });
  });
}

function saveTasks() {
  localStorage.setItem("tasks", todoList.innerHTML);
}
