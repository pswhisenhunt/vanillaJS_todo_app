class Todo {
    constructor(text = '') {
        this.text = text;
        this._id = generateId();
    }

    save = () => {
        mockSaveTodo(this)
            .then((data) => {
                let todos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.push(data.todo);
                localStorage.setItem('todos', JSON.stringify(todos)); })
            .catch((data) => {
                console.error(`${data.status}: ${data.error}`)
            })
    }

    update = () => {}

    delete =  () => {}
}