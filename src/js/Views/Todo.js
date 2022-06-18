function saveTodo(event) {
    event.preventDefault();
    let todoText = document.getElementById('todo').value;
    let todo = new Todo(todoText);
    todo.save().then((data) => {
        if (data.status === 200) {
            // render new view 
        } else {
            // render error
        }
    })
}