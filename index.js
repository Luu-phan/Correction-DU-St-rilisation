



const getFile = document.getElementById("input-file")
let fileStudent;
getFile.addEventListener('change', (e) => {
    const linkFile = window.URL.createObjectURL(e.target.files[0])
    console.log(linkFile);
    getFile.style.display = 'none'
    fetch(linkFile)
    .then((response) => response.json())
    .then((jsondata) => {
        fileStudent = jsondata;
        jsondata.QCM.forEach(element => {
            createElementCorrection(document.querySelector(".etudiant"), element)
        })
    })
    setTimeout(getResponse, 500)
})



let file;
fetch("./correction.json")
.then((response) => response.json())
.then((jsondata) => {
    file = jsondata
    jsondata.QCM.forEach(element => {
        createElement(document.querySelector(".formateur"), element)
    })
    setTimeout(() => {
        const name = document.querySelector('.container-name_formateur')
        const lastName = document.querySelector('.container-lastName_formateur')
        const school = document.querySelector('.container-school_formateur')
        const mail = document.querySelector('.container-mail_formateur')
        name.innerHTML = "name : " + file.QCM[60].name
        lastName.innerHTML = "prénom : " + file.QCM[60].lastName
        school.innerHTML = "Établissement : " + file.QCM[60].school
        mail.innerHTML = "mail : " + file.QCM[60].mail
    }, 500)

})
.catch(error => console.log(error));
let number = 100;
let numberTwo = 1000;

function getResponse(){
    const containerChoice = document.querySelectorAll('.container-choice_formateur')
    const containerChoiceStudent = document.querySelectorAll('.container-choice_etudiant')
    const containerChoiceOrder = document.querySelectorAll('.choice-order_formateur')
    const containerChoiceOrderStudent = document.querySelectorAll('.choice-order_etudiant')
    console.log(containerChoice)
    for(let i = 0; i<containerChoice.length; i++){
        containerChoice[i].children[0].checked === containerChoiceStudent[i].children[0].checked ? containerChoiceStudent[i].style.backgroundColor = '#d7eed4' : containerChoiceStudent[i].style.backgroundColor = '#eed4d4';
    }
    for(let i = 0; i<containerChoiceOrder.length; i++){
        containerChoiceOrder[i].children[0].value === containerChoiceOrderStudent[i].children[0].value ? containerChoiceOrderStudent[i].style.backgroundColor = '#d7eed4' : containerChoiceOrderStudent[i].style.backgroundColor = '#eed4d4';
    }

    const name = document.querySelector('.container-name')
    const lastName = document.querySelector('.container-lastName')
    const school = document.querySelector('.container-school')
    const mail = document.querySelector('.container-mail')

    name.innerHTML = "name : " + fileStudent.QCM[60].name
    lastName.innerHTML = "prénom : " + fileStudent.QCM[60].lastName
    school.innerHTML = "Établissement : " + fileStudent.QCM[60].school
    mail.innerHTML = "mail : " + fileStudent.QCM[60].mail

    console.log(fileStudent)
}

function createElement(container, element) {
    const newContainer = document.createElement("div");
    newContainer.setAttribute('class', 'group-question')
    const questionNumber = document.createElement("h3");
    const question = document.createElement("h4");
    switch(element.role){
        case "input":
            questionNumber.innerHTML = element.QuestionNumber;
            question.innerHTML = element.QuestionName          
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);           
            if(element.smallInput != undefined){
                const newDiv = document.createElement("div");
                newDiv.setAttribute('class', 'small-input_gestion')
                element.smallInput.forEach(single => {
                    const input = document.createElement("input");
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'small-input')
                    single.input.length > 3 ? input.value = single.input : input.value = "";
                    input.disabled =true
                    newDiv.appendChild(input);
                });
                newContainer.appendChild(newDiv)
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 4 ? input.value = element.middleInput[0].input : input.value = "" ;
                input.addEventListener('keypress', (e) => {
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }
                })
                input.disabled =true
                newContainer.appendChild(input)  
            }
            if(element.bigInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'big-input')
                element.bigInput[0].input.length > 4 ? input.value = element.bigInput[0].input : input.value = "" ;
                input.addEventListener('keypress', (e) => {
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }
                })
                input.disabled =true
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "uniqueChoice":
            questionNumber.innerHTML = element.QuestionNumber;
            question.innerHTML = element.QuestionName
            
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);

            const newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'choice_gestion')
            element.choice.forEach(single => {
                number = number + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice container-choice_formateur');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox checkbox_formateur');
                if(single.checked === false){
                    input.checked = false
                }if(single.checked === true){
                    input.checked = true
                }
                input.disabled =true
                input.setAttribute('id', `${number}`);
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                element.choice.length <= 3 ? newDiv.style.width = "fit-content" : null;
                element.choice.length <= 3 ? containerChoice.style.marginRight = "15px" : null;
                input.disabled =true
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                newDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(newDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 4 ? input.value = element.middleInput[0].input : input.value = "" ;
                input.disabled =true
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "multipleChoice":
            question.innerHTML = element.QuestionName;
            questionNumber.innerHTML = element.QuestionNumber + " {#Multiple}";               
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            const reNewDiv = document.createElement("div");
            reNewDiv.setAttribute('class', 'choice_gestion')
            element.choice.forEach(single => {
                numberTwo = numberTwo + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice container-choice_formateur');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox checkbox_formateur');
                input.setAttribute('id', `${numberTwo}`);
                if(single.checked === false){
                    input.checked = false
                }if(single.checked === true){
                    input.checked = true
                }
                input.disabled =true
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                reNewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(reNewDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 3 ? input.value = element.middleInput[0].input : input.value = "";
                input.disabled =true
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "orderChoice":
            question.innerHTML = element.QuestionName
            questionNumber.innerHTML = element.QuestionNumber;               
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            const rerenewDiv = document.createElement("div");
            rerenewDiv.setAttribute('class', 'choice_gestion')
            element.choiceOrder.forEach(single => {
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice_order choice-order_formateur');
                input.setAttribute('type', 'number');
                input.setAttribute('class', 'case-number');
                single.value > 0 ? input.value = single.value : input.placeholder = single.value;
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                input.disabled =true
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                rerenewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(rerenewDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                
                input.disabled =true
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
    }
}

function createElementCorrection(container, element) {
    const newContainer = document.createElement("div");
    newContainer.setAttribute('class', 'group-question')
    const questionNumber = document.createElement("h3");
    const question = document.createElement("h4");
    switch(element.role){
        case "input":
            questionNumber.innerHTML = element.QuestionNumber;
            question.innerHTML = element.QuestionName          
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);           
            if(element.smallInput != undefined){
                const newDiv = document.createElement("div");
                newDiv.setAttribute('class', 'small-input_gestion')
                element.smallInput.forEach(single => {
                    const input = document.createElement("input");
                    input.setAttribute('type', 'text')
                    input.setAttribute('class', 'small-input')
                    single.input.length > 3 ? input.value = single.input : input.value = "";
                    newDiv.appendChild(input);
                });
                newContainer.appendChild(newDiv)
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 4 ? input.value = element.middleInput[0].input : input.value = "" ;
                input.addEventListener('keypress', (e) => {
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }
                })
                newContainer.appendChild(input)  
            }
            if(element.bigInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'big-input')
                element.bigInput[0].input.length > 4 ? input.value = element.bigInput[0].input : input.value = "" ;
                input.addEventListener('keypress', (e) => {
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }
                })
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "uniqueChoice":
            questionNumber.innerHTML = element.QuestionNumber;
            question.innerHTML = element.QuestionName
            
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);

            const newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'choice_gestion')
            element.choice.forEach(single => {
                number = number + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice container-choice_etudiant');
                containerChoice.setAttribute('id', `${number}`);
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox ');
                if(single.checked === false){
                    input.checked = false
                }if(single.checked === true){
                    input.checked = true
                }
                console.log(file.QCM)
                
                input.disabled =true
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                element.choice.length <= 3 ? newDiv.style.width = "fit-content" : null;
                element.choice.length <= 3 ? containerChoice.style.marginRight = "15px" : null;
                input.disabled =true
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                newDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(newDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 4 ? input.value = element.middleInput[0].input : input.value = "" ;
                input.addEventListener('keypress', (e) => {
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }
                })
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "multipleChoice":
            question.innerHTML = element.QuestionName;
            questionNumber.innerHTML = element.QuestionNumber + " {#Multiple}";               
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            const reNewDiv = document.createElement("div");
            reNewDiv.setAttribute('class', 'choice_gestion')
            element.choice.forEach(single => {
                numberTwo = numberTwo + 1;
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice container-choice_etudiant');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'checkbox');
                input.setAttribute('id', `${numberTwo}`);
                if(single.checked === false){
                    input.checked = false
                }if(single.checked === true){
                    input.checked = true
                }
                // for(let i = 0; i<file.QCM.length; i++){
                //     if(file.QCM[i].choice != undefined){
                //         for(let h = 0; h< file.QCM[i].choice.length;h++){
                //             console.log(file.QCM[i].choice[h])
                //             if(file.QCM[i].choice[h].checked != fileStudent.QCM[i].choice[h].checked){
                //                 containerChoice.style.backgroundColor = "#ffb9b9";
                //             }
                //             if(file.QCM[i].choice[h].checked === fileStudent.QCM[i].choice[h].checked){
                //                 containerChoice.style.backgroundColor = "#b9ffb9";
                //             }
                //         }
                //     }
                // }
                input.disabled =true
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                reNewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(reNewDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                element.middleInput[0].input.length > 3 ? input.value = element.middleInput[0].input : input.value = "";
                input.addEventListener('keypress', (e) => {
                    if(e.code === "Enter"){
                        e.preventDefault()
                    }
                    if(e.code === "NumpadEnter"){
                        e.preventDefault()
                    }
                    if(input.value.length === 600){
                        e.preventDefault()
                    }
                    input.onpaste = (e)=> {
                        e.preventDefault();
                    }
                })
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
        case "orderChoice":
            question.innerHTML = element.QuestionName
            questionNumber.innerHTML = element.QuestionNumber;               
            newContainer.appendChild(questionNumber);
            newContainer.appendChild(question);
            const rerenewDiv = document.createElement("div");
            rerenewDiv.setAttribute('class', 'choice_gestion')
            element.choiceOrder.forEach(single => {
                const containerChoice = document.createElement("div");
                const input = document.createElement("input");
                const string = document.createElement("p");
                containerChoice.setAttribute('class', 'container-choice choice-order_etudiant');
                input.setAttribute('type', 'number');
                input.setAttribute('class', 'case-number');
                single.value > 0 ? input.value = single.value : input.placeholder = single.value;
                for(let i = 0; i<file.QCM.length; i++){
                    if(file.QCM[i].choice != undefined){
                        for(let h = 0; h< file.QCM[i].choice.length;h++){
                            console.log(file.QCM[i].choice[h])
                            if(file.QCM[i].choice[h].value != fileStudent.QCM[i].choice[h].value){
                                containerChoice.style.backgroundColor = "#ffb9b9";
                            }
                            if(file.QCM[i].choice[h].value === fileStudent.QCM[i].choice[h].value){
                                containerChoice.style.backgroundColor = "#b9ffb9";
                            }
                        }
                    }
                }
                string.setAttribute('class', 'string-choice');
                string.innerHTML = single.choice;
                containerChoice.appendChild(input)
                containerChoice.appendChild(string)
                rerenewDiv.appendChild(containerChoice)
            });
            newContainer.appendChild(rerenewDiv)
            if(element.titleInput != undefined){    
                const string = document.createElement("p");
                string.setAttribute('class', '-string')
                string.innerHTML = element.titleInput
                newContainer.appendChild(string)  
            }
            if(element.middleInput != undefined){    
                const input = document.createElement("textarea");
                input.setAttribute('class', 'middle-input')
                input.disabled =true
                newContainer.appendChild(input)  
            }
            container.appendChild(newContainer)
        break;
    }
}

function generer(){
    const element = document.body;
    element.style.minWidth= "1900px"
    setTimeout(() => {
        html2canvas(document.getElementById("print")).then(canvas => {
            const getName = fileStudent.QCM[60].name
            const getLastName = fileStudent.QCM[60].lastName
            const a = document.createElement('a');
            let link = canvas.toDataURL();
            a.href = link
            a.download = `${getName+'_'+getLastName+'_correction.png'}`
            setTimeout(() => {
                a.click()
            }, 1500);
        })
    }, 2000);
    setTimeout(() => {
        element.style.minWidth= "0"
    }, 8000);
}
function addMenu(){
    const container = document.body;
    let menuBool = false
    const createDivMenu = document.createElement('div')
    createDivMenu.setAttribute('class', 'menu')
    const createIco = document.createElement('i')
    createIco.setAttribute('class', 'fa-solid fa-bars')
    const createBtnDownload = document.createElement('button')
    createBtnDownload.setAttribute('class', 'btn')
    createBtnDownload.innerHTML = 'Télécharger la correction'
    createIco.addEventListener('click', () => {
        menuBool = !menuBool
        if (menuBool === false){
            createIco.className = 'fa-solid fa-bars'
            createDivMenu.classList.add('menuclose')
            createDivMenu.classList.remove('menuopen')
        }else{
            createIco.className = 'fa-solid fa-xmark'
            createDivMenu.classList.add('menuopen')
            createDivMenu.classList.remove('menuclose')
        }
    })
    
    createBtnDownload.addEventListener('click', () => {
        generer()
    })
    createDivMenu.appendChild(createIco)
    createDivMenu.appendChild(createBtnDownload)
    container.appendChild(createDivMenu)
}
addMenu();