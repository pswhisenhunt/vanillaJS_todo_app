function saveTodo(event) {
    event.preventDefault();
    let todoText = document.getElementById('todo').value;
    let todoDue = document.getElementById('due').value;
    let todo = new Todo({
        text: todoText,
        due: todoDue,
        completed: false,
    });
    todo.save().then((data) => {
        if (data.status === 200) {
            renderTodo(data.todo);
        } else {
            renderError(data);
        }
    })
}

function createTodoView(data) {
    const todoListItem = document.createElement('li');
    const todoContainer = document.createElement('div');
    const todoControls = document.createElement('span');
    const deleteTodoButton = document.createElement('button');
    const markCompleteLabel = document.createElement('label');
    const markCompleteCheckbox = document.createElement('input');
    
    markCompleteCheckbox.setAttribute('type', 'checkbox');

    let text = data.text;
    let dueDate = new Date(data.due);

    text += '<br/>Due: ' + dueDate.getMonth() + '/' + dueDate.getDay() + '/' +   dueDate.getFullYear();
    text += ' at ' + dueDate.getHours() + ':' + dueDate.getMinutes();

    todoListItem.classList.add('todo-list-item_' + data._id);
    todoContainer.classList.add('todo-container_' + data._id);
    todoControls.classList.add('todo-controls_' + data._id);
    deleteTodoButton.classList.add('delete-todo_' + data._id);
    markCompleteLabel.classList.add('label_' + data._id);
    markCompleteCheckbox.classList.add('toggle-complete_' + data._id)
    
    if (data.completed) {
        todoContainer.classList.add('completed');
        markCompleteCheckbox.setAttribute('checked', true);
    }

    deleteTodoButton.dataset.id = data._id;
    markCompleteCheckbox.dataset.id = data._id;
    todoContainer.dataset.id = data._id;
    
    deleteTodoButton.innerHTML = 'Delete';
    markCompleteLabel.innerHTML = "Completed";
    todoContainer.innerHTML = text;

    deleteTodoButton.addEventListener('click', (event) => {
        event.preventDefault();
        let id = event.target.getAttribute('data-id');
        remove(id).then((data) => {
            if (data.status == 200) {
                destroyTodoView(data.id);
            } else {
                renderError(data);
            }
        });
    });

    markCompleteCheckbox.addEventListener('click', (event) => {
        if (markCompleteCheckbox.checked) {
           completed(data._id).then((data) => {
                if (data.status === 200) {
                    todoContainer.classList.add('completed');
                    markCompleteCheckbox.disabled = true;
                } else {
                    renderError(error);
                }
           });
        } else {
            todoContainer.classList.remove('completed');
        }
    });

    todoControls.appendChild(deleteTodoButton);
    todoControls.appendChild(markCompleteLabel);
    todoControls.appendChild(markCompleteCheckbox);
    todoContainer.appendChild(todoControls);
    todoListItem.appendChild(todoContainer);

    return todoListItem;
}

function destroyTodoView(id) {
    const todoListItem = document.getElementsByClassName('todo-list-item_' + id)[0];
    const todoContainer = document.getElementsByClassName('todo-container_' + id)[0];
    const todoControls = document.getElementsByClassName('todo-controls_' + id)[0];
    const deleteTodoButton = document.getElementsByClassName('delete-todo_' + id)[0];
    const markCompleteLabel = document.getElementsByClassName('label_' + id)[0];
    const markCompleteCheckbox = document.getElementsByClassName('toggle-complete_' + id)[0];

    deleteTodoButton.removeEventListener('click', () => {});
    markCompleteCheckbox.removeEventListener('click', () => {});

    todoControls.removeChild(deleteTodoButton);
    todoControls.removeChild(markCompleteCheckbox);
    todoControls.removeChild(markCompleteLabel);
    todoContainer.removeChild(todoControls);
    todoListItem.removeChild(todoContainer);
}

function renderTodo(data) {
    const todoList = document.getElementById('todo-list');
    todoList.classList.add('todo-list');
    todoList.appendChild(createTodoView(data));
}