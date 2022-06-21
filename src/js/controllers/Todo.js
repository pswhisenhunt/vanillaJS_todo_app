function update(id, data) {
    let todo = this.get(id);
    let updated = {...todo, ...data};
    let bound = updated.save().bind(this);
    console.log(bound);
}

function deleteTodo(id) {
    return mockDeleteTodo(id)
        .then(data => data)
        .catch(error => error);
}

function getAll() {
    return JSON.parse(localStorage.getItems('todos')) || [];
}

function get(id) {
    let todos = this.getAll();
    return todos.filter(todo => todo.id === id);
}