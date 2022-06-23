import { Todo } from './modules/todo.mjs'
import { getItems, setItems } from './modules/api.mjs'


const todoTextInput = document.getElementById('todoText')
const todoDueInput = document.getElementById('due')

document.getElementById('addTodo').addEventListener('click', (event) => {
    event.preventDefault();
    let text = todoTextInput ? todoTextInput.value : ''
    let due = todoDueInput ? todoDueInput.value : new Date()
    let completed = false;
    let todo = new Todo({text, due, completed});
    todo.save().then((res) => {
        if (res.status === 200) {
            todo.view()
            todoTextInput.value = ''
            todoDueInput.value = ''
        }
    }).catch((error) => {
        console.error(error)
    })
});

/** 
 * Get all of the existing todos from local storage, 
 * convert them into Todo objects, sync the newly created
 * todo objects with localstorage so they contain the same
 * ids, and create TodoView objects for each when the DOM is loaded
 **/
document.addEventListener("DOMContentLoaded", () => {
    let localStorageTodos = getItems('todos')
    let updatedTodoReferences = [];
    localStorageTodos.forEach((lsTodo) => {
        let todo = new Todo(lsTodo)
        updatedTodoReferences.push(todo)
        todo.view()
    })
    setItems('todos', updatedTodoReferences)
});