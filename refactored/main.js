import { Todo } from './modules/todo.mjs'

/** 
 * Event Listeners
*/

const todoTextInput = document.getElementById('todoText')
const todoDueInput = document.getElementById('due')

document.getElementById('addTodo').addEventListener('click', (event) => {
    event.preventDefault();
    let text = todoTextInput ? todoTextInput.value : ''
    let due = todoDueInput ? todoDueInput.value : new Date()
    let completed = false;
    let todo = new Todo({text, due, completed});
    todo.save();
});