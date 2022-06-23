const save = (todo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (todo.text) {
                let todos = getItems('todos')
                todos.push(todo)
                setItems('todos', todos)
                resolve({status: 200})
            } else {
                reject({status: 400, message: "Invalid: a to do must have text"})
            }
        }, 1000)
    })
}

const remove = (todo) => {
    return new Promise((resolve, reject) => {
        let todos = getItems('todos')
        let withRemoved = todos.filter((item) => {
            return item._id != todo._id
        })
        setTimeout(() => {
            if (withRemoved.length === todos.length - 1) {
                setItems('todos', withRemoved)
                resolve({status: 200})
            } else {
                reject({status: 400, message: 'Failed to remove to do'})
            }
        })
    })
}

const update = (todo, data) => {
    return new Promise((resolve, reject) => {
        let todos = getItems('todos')
        let index = todos.findIndex(item => item._id === todo._id)
        let error = index <= 0 ? true : false
        todos[index] = {...todo, ...data}
        setTimeout(() => {
            if (!error) {
                setItems('todos', todos)
                resolve({status: 200})
            } else {
                reject({status: 400, message: 'Cannot update todo'})
            }
        })
    })
}

const getItems = (name) => {
    return JSON.parse(localStorage.getItem(name)) || []
}

const setItems = (name, items) => {
    localStorage.setItem(name, JSON.stringify(items))
}

export { save, remove, getItems, setItems, update }