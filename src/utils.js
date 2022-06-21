/** 
 * Generates a unique ID for each todo object
*/
const generateId = () => {
    return `${randomStr()}-${randomStr()}-${randomStr()}-${randomStr()}`;
}

const randomStr = () => {
    return Math.floor((1 + Math.random()) * 10000).toString(16);
}

/**
 * Mocks async req for saving a todo
 */
const mockSaveTodo = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!data.text) {
                reject({ status: 400, message: 'Invalid property: text'})
            } else {
                let todos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.push(data);
                localStorage.setItem('todos', JSON.stringify(todos));
                resolve({ status: 200, todo: data }) 
            }
        }, 1000);
    });
}

const mockDeleteTodo =  (id) => {
    let todos =  JSON.parse(localStorage.getItem('todos')) || [];
    let removed = todos.filter((todo) => {
        return todo._id !== id;
    });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (removed.length === todos.length -1) {
                localStorage.setItem('todos', JSON.stringify(removed));
                resolve({status: 200, id: id});
            } else {
                reject({status: 400, message: 'Failed to delete todo'});
            }
        }, 1000);
    })
}