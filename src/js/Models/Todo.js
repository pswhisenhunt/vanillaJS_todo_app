class Todo {
    constructor(data) {
        this._id = generateId();
        this.text = data.text ? data.text : '';
        this.due = data.due ? data.due : new Date();
        this.completed = data.completed ? true : false;
    }

    save = () => {
        return mockSaveTodo(this)
            .then(data => data)
            .catch(error => error);
    }

}