document.addEventListener("DOMContentLoaded", function () {
    const url = "http://127.0.0.1:8000/";
    var input = '';

    var niceBut = document.getElementById("NiceBut");
    if (niceBut) {
        niceBut.addEventListener("click", () => {
            input = document.getElementById("taskinput").value;
            console.log(input);
            var htt = new XMLHttpRequest();
            htt.open("POST", "http://127.0.0.1:8000/add_todos/");
            htt.setRequestHeader("Content-Type", 'application/json');
            htt.send(JSON.stringify({
                'task': input,
                'due_date': "wip"
            }));

            var gethtt  = new XMLHttpRequest();

            gethtt.open("GET", "http://127.0.0.1:8000/get_todos")


            gethtt.onload = () =>{
                const data = gethtt.response
                
                const row = document.createElement('div')
                const col = document.createElement('div')
                const inputGroup = document.createElement('div')
                const para = document.createElement('p')
                const butCom = document.createElement('button')
                const butDel = document.createElement('button')

                row.classList.add("row")
                col.classList.add("col-12","d-flex","justify-content-center")
                inputGroup.classList.add("input-group","d-flex","justify-content-center")
                para.classList.add("lead", "text-justify", "m-sm")
                para.innerText = "Hi!"
                butCom.classList.add("btn", "btn-outline-secondary")
                butCom.type = "button"
                butCom.innerText = "Complete"
                butDel.classList.add("btn", "btn-outline-secondary")
                butDel.type = "button"
                butDel.innerText = "Delete"

                const last = data[-1];

                console.log(last)
                
                const lastDict = last['String_Todo'];

                console.log(lastDict)

                const inputList = [
                    para,
                    butCom,
                    butDel
                ]

                const container = document.getElementById("main")
                const childRow = document.getElementById("child")

                inputList.forEach((Dom) =>{
                    inputGroup.appendChild(Dom);
                });
            
                col.appendChild(inputGroup)
                row.appendChild(col)
                container.insertBefore(row, container.firstChild)
                }

            gethtt.send();

        });
    }
});
