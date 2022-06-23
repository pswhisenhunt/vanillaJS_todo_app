class TodoView {
    constructor(todo) {
        this.todo = todo
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

        /** add attributes to DOM elements */
        todoTextContainer.setAttribute('id', this.todo._id)
        deleteTodoButton.setAttribute('id', this.todo._id)
        markCompleteCheckbox.setAttribute('id', this.todo._id)
        markCompleteCheckbox.setAttribute('type', 'checkbox')
        
        if (this.todo.completed) {
            todoTextContainer.classList.add('todo--completed');
            markCompleteCheckbox.setAttribute('checked', true);
            markCompleteCheckbox.disabled = true;
        }
        
        /** add text to display */
        deleteTodoButton.innerHTML = 'Delete';
        markCompleteLabel.innerHTML = "Completed";
        todoTextContainer.innerHTML = text;
        
        /** add event listeners */
        deleteTodoButton.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(this)
        })

        markCompleteCheckbox.addEventListener('click', (event) => {
            todoTextContainer.classList.add('todo--completed');
            markCompleteCheckbox.setAttribute('checked', true);
            markCompleteCheckbox.disabled = true;
            
        })

        /** append DOM elements */
        todoControls.appendChild(deleteTodoButton);
        todoControls.appendChild(markCompleteLabel);
        todoControls.appendChild(markCompleteCheckbox);
        todoTextContainer.appendChild(todoControls);
        todosContainer.appendChild(todoTextContainer);
    }
}

export { TodoView }