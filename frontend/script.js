'use strict'

let addBtn = document.querySelector('.addBtn')
let input = document.querySelector('input')
let props = document.querySelector('.active')
let addNew = document.querySelector('.add-new')
let filterSearch = document.querySelector('.filterSearch')
let displayTodo = document.querySelector('.displayTodo')
let newArr, li
let complete = false
let completed = document.querySelector('.completed')
let completedTodo = document.querySelector('.completedTodo')
let p = document.createElement('p')


const init = () => {
    let inputValue = input.value.charAt(0).toUpperCase() + input.value.slice(1) // Capitalizes the first letter

    li = document.createElement('li')
    li.className = 'listed-items'


    if(inputValue === ""){
        p.innerHTML = "This cannot be empty"
        displayError(p)

    }else if(input.value[0] === ' '){
        p.innerHTML = "Spaces not allowed"
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
        // postData()
         
    }
    
    input.value =  ""

}


addBtn.addEventListener('click', init)

// This checks if an element was added after an event
displayTodo.addEventListener('DOMNodeInserted', function(){
    let listedItems = displayTodo.querySelectorAll('.listed-items')
    let editBtn = displayTodo.querySelectorAll('.editBtn')
    
    listedItems.forEach(element => {
        
    
        element.addEventListener('click', function(e){

            if(e.target.dataset.check) {

                completedTodo.append(element)
                complete = true
                completed.classList.remove('hidden')
                e.target.dataset.edit.disabled = true
                // editBtn.disabled = true
                hideDivs()
                

            }else if(e.target.dataset.edit) {
                // let oldLetter = element
                input.value = element.textContent.split(' ')
                console.log('edited');
                

            }else if(e.target.dataset.delete){

                displayTodo.removeChild(element)
                hideDivs()

            }
           
        })

    }) 
})



// Filter Todo and See if todo exists
filterSearch.addEventListener('keypress', function(e){
    
})


async function fetchData() {
    

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

// fetchData()


async function postData() {

    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/`, {
        "method": "POST",
        body: JSON.stringify({ 
            description: input.value
        }),
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    // deletePosts(data.data)
    console.log(data);

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

