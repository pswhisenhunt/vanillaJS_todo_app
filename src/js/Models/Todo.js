class Todo {
    constructor(text = '') {
        this._id = generateId();
        this.text = text;
    }

    save = () => {
        return mockSaveTodo(this)
            .then(data => data)
            .catch(error => error)
    }

    getAll = () => {
        return JSON.parse(localStorage.getItems('todos')) || [];
    }

    get = (id) => {
        let todos = this.getAll();
        return todos.filter(todo => todo.id === id)
    }

    update = (id, data) => {
        let todo = this.get(id);
        let updated = {...todo, ...data};
        //remove from localstorage and add the updated todo
    }

    delete =  (id) => {}
}