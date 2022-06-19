class Todo {
    constructor(text = '', dueDate = new Date()) {
        this._id = generateId();
        this.text = text;
    }

    save = () => {
        return mockSaveTodo(this)
            .then(data => data)
            .catch(error => error)
    }

    update = () => {}

    delete =  () => {}
}