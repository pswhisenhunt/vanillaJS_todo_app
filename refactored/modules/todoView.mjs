import { ErrorView } from './errorView.mjs'
import { removeTodo, updateTodo } from './handlers.mjs'

class TodoView {
    constructor(todo, el) {
       this.todo = todo
       // TODO: use this template generate the html
       this.el = el
       this.removeTodoHandler = removeTodo.bind(this)
       this.updateTodoHandler = updateTodo.bind(this)
    }

    generateHTML = () => {
        /** format todo data */
        let text = this.todo.text
        let dueDate = new Date(this.todo.due)
        text += '<br/>Due: ' + dueDate.getMonth() + '/' + dueDate.getDay() + 
                '/' + dueDate.getFullYear()

        /** create DOM elements */
        const todosContainer = document.getElementById('todos-container')
        const todoTextContainer = document.createElement('div')
        const todoControls = document.createElement('span')
        const deleteTodoButton = document.createElement('button')
        const markCompleteLabel = document.createElement('label')
        const markCompleteCheckbox = document.createElement('input')

        /** add classes to DOM elements  */
        todoTextContainer.classList.add('todo--container')
        todoControls.classList.add('todo--controls')
        deleteTodoButton.classList.add('todo__controls__button')
        deleteTodoButton.classList.add('delete')

        /** add attributes to DOM elements */
        todoTextContainer.setAttribute('id', `todo-container_${this.todo._id}`)
        todoControls.setAttribute('id', `todo-controls_${this.todo._id}`)
        deleteTodoButton.setAttribute('id', `delete-btn_${this.todo._id}`)
        markCompleteLabel.setAttribute('id', `complete-label_${this.todo._id}`)
        markCompleteCheckbox.setAttribute('id', `complete-checkbox_${this.todo._id}`)
        markCompleteCheckbox.setAttribute('type', 'checkbox')
        
        if (this.todo.completed) {
            todoTextContainer.classList.add('todo--completed')
            markCompleteCheckbox.setAttribute('checked', true)
            markCompleteCheckbox.disabled = true
        }
        
        /** add text to display */
        deleteTodoButton.innerHTML = 'Delete';
        markCompleteLabel.innerHTML = "Completed";
        todoTextContainer.innerHTML = text;
        
        /** add event listeners */
        deleteTodoButton.addEventListener('click', this.removeTodoHandler)
        markCompleteCheckbox.addEventListener('click', this.updateTodoHandler)

        /** append DOM elements */
        todoControls.appendChild(deleteTodoButton)
        todoControls.appendChild(markCompleteLabel)
        todoControls.appendChild(markCompleteCheckbox)
        todoTextContainer.appendChild(todoControls)
        todosContainer.appendChild(todoTextContainer)
    }

    destroyHTML = () => {   
        const todosContainer = document.getElementById('todos-container')
        const todoTextContainer = document.getElementById(`todo-container_${this.todo._id}`)
        const todoControls = document.getElementById(`todo-controls_${this.todo._id}`)
        const deleteTodoButton = document.getElementById(`delete-btn_${this.todo._id}`)
        const markCompleteLabel =  document.getElementById(`complete-label_${this.todo._id}`)
        const markCompleteCheckbox = document.getElementById(`complete-checkbox_${this.todo._id}`)

        deleteTodoButton.removeEventListener('click', this.removeTodoHandler)
        markCompleteCheckbox.removeEventListener('click', this.updateTodoHandler)
    
        todoControls.removeChild(deleteTodoButton)
        todoControls.removeChild(markCompleteCheckbox)
        todoControls.removeChild(markCompleteLabel)
        todosContainer.removeChild(todoTextContainer)
    }
}

export { TodoView }