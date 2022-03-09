'use strict'

let addBtn = document.querySelector('.addBtn')
let input = document.querySelector('input')
let props = document.querySelector('.active')
let addNew = document.querySelector('.add-new')
let filterSearch = document.querySelector('.filterSearch')
let displayTodo = document.querySelector('.displayTodo')
// let btn = document.querySelector('.btn')
let newArr, li, checkbox, otherBtn, editBtn, deleteBtn;
let p = document.createElement('p')


let init = () => {
    let inputValue = input.value
    // newArr = [inputValue];

    li = document.createElement('li')
    checkbox = document.createElement('input')
    otherBtn = document.createElement('div')
    editBtn = document.createElement('button')
    deleteBtn = document.createElement('button')


    otherBtn.id = 'otherBtn'
    editBtn.className = 'editBtn'
    deleteBtn.className = 'deleteBtn'
    checkbox.type = 'checkbox'
    checkbox.className = 'checkbox'

    editBtn.innerHTML = `<i class="fa-light fa-pencil"></i>`
    deleteBtn.innerHTML = `<i class="fa-light fa-trash"></i>`


    if(inputValue === "" || inputValue.indexOf(' ') >= 0){

        
        p.innerHTML = "This cannot be empty"
        p.style.color = 'red'
        addNew.append(p)
        
        setTimeout(clear, 3000)
        function clear(){
            p.innerHTML = ''
        }

    }else{
        // Put todo in an array without duplicates
        newArr = new Set();
        newArr.add(inputValue); // adds Todo to array
        
        newArr.forEach(element => {
            
            
            
            li.innerHTML = element

            otherBtn.append(editBtn)
            otherBtn.append(deleteBtn)

            displayTodo.appendChild(checkbox)
            displayTodo.appendChild(li)
            displayTodo.appendChild(otherBtn)

        });

        props.classList.remove('hidden')

        
       
    }
    
    input.value =  ""
    // clicked = document.querySelector('.checkbox')
    // console.log(clicked);
}

// console.log(checkbox, otherBtn, editBtn, deleteBtn)

addBtn.addEventListener('click', init)


// Filter Todo and See if todo exists
filterSearch.addEventListener('keypress', function(e){
    
})


let body = {message: "Kelechi Egekenze"}

async function fetchAPI(number) {
    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/${number}`, {
        "method": "PUT",
        "headers": {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(body)
    })

    let data = await response.json()
    console.log(data);
}
fetchAPI(1)
