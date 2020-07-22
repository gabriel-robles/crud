const formDelete = document.querySelector('#btn-delete')

function confirmation(formDelete) {
    formDelete.addEventListener('submit', function(event) {
        const confirmation = confirm("Deseja Realmente Deletar?")
        if (!confirmation) {
            event.preventDefault()
        }
    })
}

if (formDelete) {
    confirmation(formDelete)
}