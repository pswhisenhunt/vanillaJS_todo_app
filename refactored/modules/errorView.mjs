class ErrorView {
    constructor({status, message} = {status: 400, message: 'Error'}) {
        this.status = status
        this.message = message
    }

    generateHTML = () => {
        /** create DOM elements */
        const errorContainer = document.getElementById('error-container')
        const errorMessage = document.createElement('div')

        /** set attributes */
        errorMessage.setAttribute('id', 'error-message')

        /** append classes */
        errorContainer.classList.add('error--container')
        errorMessage.classList.add('error__message')

        /** set text to display */
        errorMessage.innerHTML = this.message

        /** append elements to DOM  */
        errorContainer.appendChild(errorMessage)

        setTimeout(() => { this.destroyHTML() }, 10000)
    }

    destroyHTML = () => {
        const errorContainer = document.getElementById('error-container')
        const errorMessage = document.getElementById('error-message')

        errorContainer.classList.remove('error--container')
        errorMessage.classList.remove('error__message')

        errorContainer.removeChild(errorMessage)
    }
}

export { ErrorView }