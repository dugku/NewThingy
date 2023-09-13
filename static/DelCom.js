async function markComplete(Complete){
    const id = Complete.getAttribute('id')
    
    let para = document.querySelector(`[data-id="${id}"]`)
    para.innerHTML = "Completed"
 

    await fetch(`http://127.0.0.1:8000/complete/${id}`)
}

function markDelete(){
    console.log("No")
}
