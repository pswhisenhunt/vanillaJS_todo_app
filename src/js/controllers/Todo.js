function remove(id) {
    return mockDeleteTodo(id)
        .then(data => data)
        .catch(error => error);
}

function completed(id) {
    let todo = get(id);
    todo.completed = true;
    return mockUpdateTodo(todo)
        .then(data => data)
        .catch(error => error);
}

function getAll() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function get(id) {
    let todos = this.getAll();
    return todos.filter(todo => todo._id === id)[0];
}