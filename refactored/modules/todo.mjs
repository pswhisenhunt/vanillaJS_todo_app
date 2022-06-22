class Todo {
    constructor({text, due, completed} = {text: '', due: new Date(), completed: false}) {
        // add id
        this.text = text
        this.due = due
        this.completed = completed
    }
}

let printTodo = () => {
    console.log(new Todo())
}

export { printTodo }