import { removeTodo, updateTodo } from './handlers.mjs'

class TodoView {
    constructor(todo, template) {
        this.todo = todo
        this.el = template.content.cloneNode(true)
        this.todoContainer = this.el.querySelector('.todo--container')
        this.todoText = this.el.querySelector('.todo__text')
        this.todoDue  = this.el.querySelector('.todo__due')
        this.todoControls = this.el.querySelector('.todo--controls')
        this.deleteTodoButton = this.el.querySelector('.todo__controls__button')
        this.markCompleteCheckbox = this.el.querySelector('.todo__controls__input')
        this.removeTodoHandler = removeTodo.bind(this)
        this.updateTodoHandler = updateTodo.bind(this)
    }


    generateHTML = () => {
        this.todoText.innerHTML = this.todo.text
        this.todoDue.innerHTML = this.todo.due

        if (this.todo.completed) {
            this.todoContainer.classList.add('todo--completed')
            this.markCompleteCheckbox.setAttribute('checked', true)
            this.markCompleteCheckbox.disabled = true
        }

        this.todoContainer.appendChild(this.todoText)
        this.todoContainer.appendChild(this.todoDue)
        this.todoContainer.appendChild(this.todoControls)

        this.deleteTodoButton.addEventListener('click', this.removeTodoHandler)
        this.markCompleteCheckbox.addEventListener('click', () => {
            this.updateTodoHandler({completed: true})
        })

        return this.el
    }

    destroyHTML = () => {
        this.todoContainer.removeChild(this.todoText)
        this.todoContainer.removeChild(this.todoDue)
        this.todoContainer.removeChild(this.todoControls)

        this.deleteTodoButton.removeEventListener('click', this.removeTodoHandler)
        this.markCompleteCheckbox.removeEventListener('click', this.updateTodoHandler)

        this.todoContainer.remove()
    }
}

export { TodoView }