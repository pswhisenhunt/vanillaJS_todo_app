import { addTodo, createExistingTodoViews } from './modules/handlers.mjs'


document.getElementById('addTodo').addEventListener('click', addTodo);
document.addEventListener("DOMContentLoaded", createExistingTodoViews);