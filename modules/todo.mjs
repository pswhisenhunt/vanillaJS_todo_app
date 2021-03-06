import { generateId } from './utils.mjs'
import { save, remove, update } from './api.mjs'

class Todo {
    constructor({text, due, completed} = {text: '', due: new Date(), completed: false}) {
        this._id = generateId()
        this.text = text
        this.due = due
        this.completed = completed
    }

    save = () => {
        return save(this)
    }

    update = (data) =>  {
        return update(this, data)
    }

    remove = () => {
        return remove(this)
    }
}

export { Todo }