document.addEventListener("DOMContentLoaded", function () {
    const url = "http://127.0.0.1:8000/";
    var input = '';

    var niceBut = document.getElementById("NiceBut");
    if (niceBut) {
        niceBut.addEventListener("click", async () => {
            input = document.getElementById("taskinput").value;
            console.log(input);
            var htt = new XMLHttpRequest();
            htt.open("POST", "http://127.0.0.1:8000/add_todos/");
            htt.setRequestHeader("Content-Type", 'application/json');
            htt.send(JSON.stringify({
                'task': input,
                'due_date': "wip"
            }));

            await fetch(`http://127.0.0.1:8000/todo/${input}`)
            .then(async (res) => {
                let yes = await res.json();

                const row = document.createElement('div');
                const col = document.createElement('div');
                const inputGroup = document.createElement('div');
                const para = document.createElement('p');
                const butCom = document.createElement('button');
                const butDel = document.createElement('button');

                row.classList.add("row");
                row.setAttribute('id', yes.task_id)
                col.classList.add("col-12", "d-flex", "justify-content-center");
                inputGroup.classList.add("input-group", "d-flex", "justify-content-center");
                para.classList.add("lead", "text-justify", "m-sm");
                para.setAttribute("data-id", yes.task_id)
                para.innerText = yes.String_Todo;

                butCom.classList.add("btn", "btn-outline-secondary");
                butCom.setAttribute('id', yes.task_id)
                butCom.addEventListener("click",async () => {
                    const id = yes.task_id

                    let para = document.querySelector(`[data-id="${id}"]`)
                    para.innerHTML = "Completed"
 

                    await fetch(`http://127.0.0.1:8000/complete/${id}`, {
                        'method': 'PUT',
                        headers: {
                            'Content-type': 'application/json'
                         },
                    })
                })
                butCom.type = "button";
                butCom.innerText = "Complete";
                butDel.classList.add("btn", "btn-outline-secondary");
                butDel.addEventListener("click", async () => {
                    const id = yes.task_id
    
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
                })
                butDel.setAttribute('id', yes.task_id)
                butDel.type = "button";
                butDel.innerText = "Delete";
                
                const inputList = [
                    para,
                    butCom,
                    butDel
                ]
    
                const container = document.getElementById("main");
                const childRow = document.getElementById("child");
    
                inputList.forEach((Dom) =>{
                    inputGroup.appendChild(Dom);
                });

                col.appendChild(inputGroup);
                row.appendChild(col);
                container.insertBefore(row, container.firstChild);
            });
    });
}
});