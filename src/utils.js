/** 
 * Generates a unique ID for each todo object
*/
const generateId = () => {
    return `${randomStr()}-${randomStr()}-${randomStr()}-${randomStr()}`;
}

const randomStr = () => {
    return Math.floor((1 + Math.random()) * 10000).toString(16)
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
        }, 1000)
    });
}