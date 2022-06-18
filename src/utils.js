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
const mockSaveTodo = (todo) => {
    return new Promise((resolve, reject) => {
        const text = todo.text;
        setTimeout(() => {
            text ? resolve({ status: 200, todo: todo }) : reject({ status: 400, message: 'Invalid property: text'})
        }, 1000)
    });
}