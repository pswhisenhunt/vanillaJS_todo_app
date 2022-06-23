import { Todo } from './todo.mjs'
import { TodoView } from './todoView.mjs'
import { ErrorView } from './errorView.mjs'
import { getItems, setItems } from './api.mjs'
import { constants } from './constants.mjs'

const addTodo = async function(event) {
    event.preventDefault()
    let text = constants.TODO_TEXT_INPUT.value
    let due = constants.TODO_DUE_INPUT.value
    let completed = false
    let todo = new Todo({text, due, completed})
    try {
        await todo.save()
        let todoView = new TodoView(todo, constants.TODO_TEMPLATE)
        todoView.generateHTML()
        constants.TODO_TEXT_INPUT.value = ''
        constants.TODO_DUE_INPUT.value = ''
    } catch {
        let errorView = new ErrorView({status: 400, message: 'Failed to save todo'})
        errorView.generateHTML()
    }  
}

const createExistingTodoViews =  function() {
    let localStorageTodos = getItems('todos')
    let updatedTodoReferences = [];
    localStorageTodos.forEach((lsTodo) => {
        let todo = new Todo(lsTodo)
        let todoView = new TodoView(todo, constants.TODO_TEMPLATE)
        todoView.generateHTML()
        updatedTodoReferences.push(todo)
    })
    setItems('todos', updatedTodoReferences)
}

const removeTodo = async function(event) {
    event.preventDefault()
    console.log(this)
    try {
        this.todo.remove();
        this.destroyHTML()
    } catch {
        let errorView = new ErrorView({status: 400, message: 'Failed to remove todo'})
        errorView.generateHTML()
    }
}

const updateTodo = async function(data) {
    // I need access to the dom elements. Put them on the todo view obj?
    try {
        await this.todo.update(data)
        todoTextContainer.classList.add('todo--completed')
        markCompleteCheckbox.setAttribute('checked', true)
        markCompleteCheckbox.disabled = true
    } catch {
        let errorView = new ErrorView({status: 400, message: 'Failed to update todo'})
        errorView.generateHTML()
    }
}

export { addTodo, createExistingTodoViews, removeTodo, updateTodo } 