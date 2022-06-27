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
        let todoTemplate = todoView.generateHTML()
        constants.TODO_LIST_CONTAINER.append(todoTemplate)
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
        let todoTemplate = todoView.generateHTML()
        constants.TODO_LIST_CONTAINER.append(todoTemplate)
        updatedTodoReferences.push(todo)
    })
    setItems('todos', updatedTodoReferences)
}

const removeTodo = async function(event) {
    event.preventDefault()
    try {
        await this.todo.remove();
        this.destroyHTML()
    } catch {
        let errorView = new ErrorView({status: 400, message: 'Failed to remove todo'})
        errorView.generateHTML()
    }
}

const updateTodo = async function(data) {
    try {
        await this.todo.update(data)
        this.todoContainer.classList.add('todo--completed')
        this.markCompleteCheckbox.setAttribute('checked', true)
        this.markCompleteCheckbox.disabled = true
    } catch {
        let errorView = new ErrorView({status: 400, message: 'Failed to update todo'})
        errorView.generateHTML()
    }
}

export { addTodo, createExistingTodoViews, removeTodo, updateTodo } 