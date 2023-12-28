import { useState } from 'react'
import './App.css'

let globalId = 1;
let todoState = [];
let oldTodoState = [];

function addTodoToDom(todo) {
  // const titleDiv = document.createElement("div");
  // const descDiv = document.createElement("div");
  // const parent = document.createElement("div");
  // const button = document.createElement("button");
  // titleDiv.innerHTML = todo.title;
  // descDiv.innerHTML = todo.description;
  // button.innerHTML = "Mark as Done";
  // parent.setAttribute("id", todo.id);
  // parent.appendChild(titleDiv);
  // parent.appendChild(descDiv);
  // parent.appendChild(button);
  // const todos = document.getElementById("todos");
  // todos.appendChild(parent);
  return (
    <div id={todo.id}>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
      <button>Mark as Done</button>
    </div>
  )
}

function removeTodoFromDom(todo) {
  const parent = document.getElementById(todo.id);
  const todos = document.getElementById("todos");
  todos.removeChild(parent);
}

function updateTodoInDom(oldTodo, newTodo) {
  const parent = document.getElementById(oldTodo.id);
  parent.children[0].innerHTML = newTodo.title;
  parent.children[1].innerHTML = newTodo.description;
}

function updateState(newTodos) {
  // calculate the diff b/w newTodos and oldTodos.
  // More specifically, find out what todos are - 
  // 1. added
  // 2. deleted
  // 3. updated
  const added = [];
  const deleted = [];
  const updated = [];

  const oldMap = new Map();
  const newMap = new Map();

  oldTodoState.forEach(function(oldTodo) {
    oldMap.set(oldTodo.id, oldTodo);
  })

  newTodos.forEach(function(newTodo) {
    if (oldMap.has(newTodo.id)) {
      const oldTodo = oldMap.get(newTodo.id);
      if ((newTodo.title !== oldTodo.title) || (newTodo.description !== oldTodo.description)) {
        updated.push(newTodo);
        updateTodoInDom(oldTodo, newTodo);
      }
    } else {
      added.push(newTodo);
      addTodoToDom(newTodo);
    }
    newMap.set(newTodo.id, newTodo);
  })

  oldTodoState.forEach(function(oldTodo) {
    if (!newMap.has(oldTodo.id)) {
      removeTodoFromDom(oldTodo);
      deleted.push(oldTodo);
    }
  })
  oldTodoState = newTodos.slice();
}

function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  todoState.push({
    title: title,
    description: description,
    id: globalId++,
  })
  updateState(todoState);
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <input type="text" id="title" placeholder="Todo title"></input> <br /><br />
      <input type="text" id="description" placeholder="Todo description"></input> <br /><br />
      <button onclick={addTodo()}>Add todo</button>
      <br /> <br />

      <div id="todos"></div>
    </div>
  )
}

export default App
