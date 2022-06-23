const save = (todo) => {
    return new Promise((resolve, reject) => {
        if (todo.text) {
            let todos = JSON.parse(localStorage.getItem('todos')) || []
            todos.push(todo)
            localStorage.setItem('todos', JSON.stringify(todos))
            resolve({status: 200})
        } else {
            reject({status: 400, message: "Invalid: a to do must have text"})
        }
    })
}

export { save }