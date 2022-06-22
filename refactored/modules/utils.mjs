/** 
 * Generates a unique ID for each todo object
*/
const generateId = () => {
    return `${randomStr()}-${randomStr()}-${randomStr()}-${randomStr()}`
}

const randomStr = () => {
    return Math.floor((1 + Math.random()) * 10000).toString(16)
}

export { generateId }