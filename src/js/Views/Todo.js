function addTodo(event) {
    event.preventDefault();
    let todoText = document.getElementById('todo').value;
    let todo = new Todo(todoText);
    todo.save();
}