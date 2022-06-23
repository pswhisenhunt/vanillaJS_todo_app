import { generateId } from './utils.mjs'
import { TodoView } from './todoView.mjs'
import { save } from './api.mjs'

class Todo {
    constructor({text, due, completed} = {text: '', due: new Date(), completed: false}) {
        this._id = generateId()
        this.text = text
        this.due = due
        this.completed = completed
    }

    save = () => {
        save(this).then((res) => {
            if (res.status === 200) {
                this.view()
            } else {
                console.error(res)
            }
        })
    }

    view = () => {
        let todoView = new TodoView(this)
        todoView.generateHTML()
    }
}

export { Todo }