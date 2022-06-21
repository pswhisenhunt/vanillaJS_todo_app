function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.classList.add('todo-list');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todo) => {
        todoList.appendChild(createTodoView(todo))
    });
}