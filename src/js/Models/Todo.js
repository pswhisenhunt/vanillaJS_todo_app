class Todo {
    constructor(text = '') {
        // add due date and time property
        this.text = text;
        this._id = generateId();
    }

    save = () => {
        return mockSaveTodo(this)
            .then((data) => {
                let todos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.push(data.todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                return data;
            })
            .catch((error) => {
                console.error(`${error.status}, ${error.message}`);
                return error;
            });
    }

    update = () => {}

    delete =  () => {}
}