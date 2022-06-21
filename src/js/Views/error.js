const error = document.getElementById('error');


function renderError({status, message}) {
    error.innerHTML = `Status Code ${status}: ${message}`;
    error.classList.remove('hidden');
    appendClose();
}

function closeError() {
    error.innerHTML = '';
    error.classList.add('hidden');
}

function appendClose() {
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.classList.add('close');
    error.appendChild(closeButton);
    
    closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        closeButton.classList.remove('close');
        error.removeChild(closeButton);
        closeButton.removeEventListener('click', closeError());
    });
}