function saveTodo(event) {
    event.preventDefault();
    let todoText = document.getElementById('todo').value;
    let todoDue = document.getElementById('due').value;
    let todo = new Todo(todoText, todoDue);
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
    const editTodoButton = document.createElement('button');

    let text = data.text;
    let dueDate = new Date(data.due);

    text += '<br/>Due: ' + dueDate.getMonth() + '/' + dueDate.getDay() + '/' +   dueDate.getFullYear();
    text += ' at ' + dueDate.getHours() + ':' + dueDate.getMinutes();

    todoListItem.classList.add('todo-list-item_' + data._id);
    todoContainer.classList.add('todo-container_' + data._id);
    todoControls.classList.add('todo-controls_' + data._id);
    deleteTodoButton.classList.add('delete-todo_' + data._id);
    editTodoButton.classList.add('edit-todo_' + data._id);

    deleteTodoButton.dataset.id = data._id;
    editTodoButton.dataset.id = data._id;
    todoContainer.dataset.id = data._id;

    deleteTodoButton.innerHTML = 'Delete';
    editTodoButton.innerHTML = 'Edit';
    todoContainer.innerHTML = text;

    deleteTodoButton.addEventListener('click', (event) => {
        event.preventDefault();
        let id = event.target.getAttribute('data-id');
        deleteTodo(id).then((data) => {
            if (data.status == 200) {
                destroyTodoView(data.id);
            } else {
                renderError(data);
            }
        });
    });

    editTodoButton.addEventListener('click', (event) => {
        console.log(event)
    });

    todoControls.appendChild(deleteTodoButton);
    todoControls.appendChild(editTodoButton);
    todoContainer.appendChild(todoControls);
    todoListItem.appendChild(todoContainer);

    return todoListItem;
}

function destroyTodoView(id) {
    const todoListItem = document.getElementsByClassName('todo-list-item_' + id)[0];
    const todoContainer = document.getElementsByClassName('todo-container_' + id)[0];
    const todoControls = document.getElementsByClassName('todo-controls_' + id)[0];
    const deleteTodoButton = document.getElementsByClassName('delete-todo_' + id)[0];
    const editTodoButton = document.getElementsByClassName('edit-todo_' + id)[0];

    deleteTodoButton.removeEventListener('click', () => {});
    editTodoButton.removeEventListener('click', () => {});

    todoControls.removeChild(deleteTodoButton);
    todoControls.removeChild(editTodoButton);
    todoContainer.removeChild(todoControls);
    todoListItem.removeChild(todoContainer);
}

function renderTodo(data) {
    const todoList = document.getElementById('todo-list');
    todoList.classList.add('todo-list');
    todoList.appendChild(createTodoView(data));
}