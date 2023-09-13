async function markComplete(Complete){
    const id = Complete.getAttribute('data-id')
    
    let para = document.querySelector(`[data-id="${id}"]`)
    para.innerHTML = "Completed"
 

    await fetch(`http://127.0.0.1:8000/complete/${id}`, {
        'method': 'PUT',
        headers: {
            'Content-type': 'application/json'
          },
    })
}

async function markDelete(Delete){
    const id = Delete.getAttribute('data-id')
    
    let para = document.querySelector(`[data-id="${id}"]`)
    para.innerHTML = "Deleted"
 

    await fetch(`http://127.0.0.1:8000/delete/${id}`, {
        'method': 'delete',
        headers: {
            'Content-type': 'application/json'
          },
    })
    .then(() => {
        const container = document.getElementById("main")
        let nada = document.getElementById(`${id}`) 

        container.removeChild(nada)
    }
    )
}
