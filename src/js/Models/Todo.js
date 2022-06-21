class Todo {
    constructor(text, due) {
        this._id = generateId();
        this.text = text ? text : '';
        this.due = due ? due : new Date();
    }

    save = () => {
        return mockSaveTodo(this)
            .then(data => data)
            .catch(error => error);
    }
}