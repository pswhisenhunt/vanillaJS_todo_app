import { generateId } from './utils.mjs'
import { TodoView } from './todoView.mjs'

class Todo {
    constructor({text, due, completed} = {text: '', due: new Date(), completed: false}) {
        this._id = generateId()
        this.text = text
        this.due = due
        this.completed = completed
    }

    save = () => {
        console.log(this)
        this.view()
    }

    view = () => {
        let todoView = new TodoView(this)
        todoView.generateHTML()
    }
}

export { Todo }