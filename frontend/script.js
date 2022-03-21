'use strict'

let addBtn = document.querySelector('.addBtn')
let input = document.querySelector('input')
let props = document.querySelector('.active')
let addNew = document.querySelector('.add-new')
let filterSearch = document.querySelector('.filterSearch')
let displayTodo = document.querySelector('.displayTodo')
let newArr, li
let inputValue
let newBody = {}
let complete = false
let completed = document.querySelector('.completed')
let completedTodo = document.querySelector('.completedTodo')
let p = document.createElement('p')
let modal = document.querySelector('#myModal')
let changeTodo = document.querySelector('#changeTodo')
let newTodoItem = document.querySelector('#newTodoItem')


const init = () => {
     // Capitalizes the first letter
    inputValue = input.value.charAt(0).toUpperCase() + input.value.slice(1)
    inputValue.trim()

    li = document.createElement('li')
    li.className = 'listed-items'


    if(inputValue === ""){
        p.innerHTML = "This cannot be empty"
        displayError(p)

    }else{
        // Put todo in an array without duplicates
        newArr = new Set();
        newArr.add(inputValue); // adds Todo to array
        
        newArr.forEach(element => {
            
            li.innerHTML = `<input type='checkbox' data-check='check'> ${element} <div class = 'otherbtn'><button data-edit='edit' class='editBtn'>Edit</button> <button data-delete='delete'>Delete</button></div>`
                
            displayTodo.appendChild(li)

        });

        hideDivs()
        postData()
         
    }
    
    input.value =  ""

}


addBtn.addEventListener('click', init)



// This checks if an element was added after an event
displayTodo.addEventListener('DOMNodeInserted', async function(){
    let listedItems = displayTodo.querySelectorAll('.listed-items')
    
    let check = document.querySelectorAll('.listed-items input')
    let getId = await fetchData()
    
    listedItems.forEach(element => {
        
        element.addEventListener('click', function(e){
            

            if(e.target.dataset.check) {

                completedTodo.append(element)
                hideDivs()
                complete = true 
                completed.classList.remove('hidden')
                
                
                
                getId.forEach(element1 => {
                    

                    check.forEach(element2 => {
                        
                        // This gets the textContent of the li element.
                        if(element1.description === element2.nextSibling.textContent.trim()){

                            newBody = {description:element2.nextSibling.textContent.trim(), completed:complete}
                            addCompletedTodo(element1.id, newBody)
                        }
                    })
                    
                })
                

            }else if(e.target.dataset.edit) {
                let oldElement = e.target.parentNode.previousSibling.textContent
                oldElement.trim()

                modal.style.display = 'block'
                newTodoItem.value = oldElement
                let newValue = newTodoItem.value.charAt(0).toUpperCase() + newTodoItem.value.slice(1)
                newValue.trim()

                getId.forEach(element1 => {
                    

                    check.forEach(element2 => {
                        
                        changeTodo.addEventListener('click', function() {

                            // This gets the textContent of the li element.
                            if(element1.description === element2.nextSibling.textContent.trim()){
                                newBody = {description:newTodoItem.value}
                                updateTodo(element1.id, newBody)
                                modal.style.display = 'none'
                                console.log('clicked');
                            }
                        })

                    })
                })

                // changeTodo.addEventListener('click', function(){
                //     e.target.parentNode.previousSibling.textContent.replace(oldElement,newTodoItem.value)
                //     modal.style.display = 'none'
                //     console.log(e.target.parentNode.previousSibling.textContent)
                // })

                // modal.addEventListener('click', function(e){
                //     if(e.target.dataset.change){
                //         // oldElement = newTodoItem.value
                //         li.innerHTML = `<input type='checkbox' data-check='check'> ${newTodoItem.value} <div class = 'otherbtn'><button data-edit='edit' class='editBtn'>Edit</button> <button data-delete='delete'>Delete</button></div>`
                //         displayTodo.replace(oldElement, li)
                //         modal.style.display = 'none'
                //         console.log('Change button was clicked!')
                //     }
                // })

                // check.forEach(element3 => {
                    // let oldElement = element3.nextSibling.textContent.trim()      
                // if(e.target && e.target.id == 'changeTodo'){
                //     // oldElement = newTodoItem.value
                //     console.log('Clicked the change button');
                // }
                

            }else if(e.target.dataset.delete){

                displayTodo.removeChild(element)
                hideDivs()
                getId.forEach(element1 => {
                    

                    check.forEach(element2 => {
                        
                        // This gets the textContent of the li element.
                        if(element1.description === element2.nextSibling.textContent.trim()){

                            // newBody = {description:element2.nextSibling.textContent.trim(), completed:complete}
                            deleteTodo(element1.id) 
                        }
                    })
                    
                })
                             

            }
           
        })

    }) 
})


// Filter Todo and See if todo exists
filterSearch.addEventListener('keypress', function(e){
    
})


async function fetchData() {

    // await postData()
    
    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    // deletePosts(data.data)
    console.log(data.data);
    return data.data
}

fetchData()

async function postData() {

    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/`, {
        "method": "POST",
        body: JSON.stringify({
            description: inputValue
        }),
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    // deletePosts(data.data)
    console.log(data);

}

async function updateTodo(id, newBody){

    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/${id}`, {
        "method": "PUT",
        body: JSON.stringify(newBody),
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    // deletePosts(data.data)
    console.log(data);
}



// Adds complete = true for checked Todos.
async function addCompletedTodo(id, newBody){

    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/complete/${id}`, {
        "method": "PUT",
        body: JSON.stringify(newBody),
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    
}



async function deleteTodo(id){

    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/${id}`, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    // deletePosts(data.data)
    // console.log(data);
}


// Displays or hides the Active and complete sections
function hideDivs() {

    if(displayTodo.innerHTML === ''){
        props.classList.add('hidden')
    }else {
        props.classList.remove('hidden')
    }

}


// Displays the error message if the input is empty or has a whitespace before the first character.
function displayError(p) {
    p.style.color = 'red'
    addNew.append(p)
    
    setTimeout(clear, 3000)
    function clear(){
        p.innerHTML = ''
    }
}

// changeTodo.addEventListener('click', function(e){
//     // let elementary
//     let newElement = newTodoItem.value.charAt(0).toUpperCase() + newTodoItem.value.slice(1)
//     newElement.trim()
//     console.log(e.target.parentNode.previousSibling.textContent)
//     e.target.parentNode.previousSibling.textContent = newElement
//     // oldElement.trim()
//     // console.log(oldElement);

// // getId.forEach(element1 => {

//     // element3.nextSibling.textContent = oldElement

//     modal.style.display = 'none'
// // })
// })