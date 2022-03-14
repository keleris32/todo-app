'use strict'

let addBtn = document.querySelector('.addBtn')
let input = document.querySelector('input')
let props = document.querySelector('.active')
let addNew = document.querySelector('.add-new')
let filterSearch = document.querySelector('.filterSearch')
let displayTodo = document.querySelector('.displayTodo')
let newArr, li, checkbox, otherBtn, editBtn, deleteBtn;
const complete = false
let completed = document.querySelector('.completed')
let p = document.createElement('p')


const init = () => {
    let inputValue = input.value

    li = document.createElement('li')
    li.className = 'listed-items'
    // checkbox = document.createElement('input')
    // otherBtn = document.createElement('div')
    // editBtn = document.createElement('button')
    // deleteBtn = document.createElement('button')


    // otherBtn.id = 'otherBtn'
    // editBtn.className = 'editBtn'
    // deleteBtn.className = 'deleteBtn'
    // checkbox.type = 'checkbox'
    // checkbox.className = 'checkbox'

    // editBtn.innerHTML = `<i class="fa-light fa-pencil"></i>`
    // deleteBtn.innerHTML = `<i class="fa-light fa-trash"></i>`


    if(inputValue === ""){
        p.innerHTML = "This cannot be empty"
        p.style.color = 'red'
        addNew.append(p)
        
        setTimeout(clear, 3000)
        function clear(){
            p.innerHTML = ''
        }

    }else if(input.value[0] === ' '){
        p.innerHTML = "Spaces not allowed"
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
            
            
            
            li.innerHTML = `<input type='checkbox' data-check='check'> ${element} <div class = 'otherbtn'><button data-edit='edit'>Edit</button> <button data-delete='delete'>Delete</button></div>`
            

            // otherBtn.append(editBtn)
            // otherBtn.append(deleteBtn)

            
            displayTodo.appendChild(li)
            // displayTodo.appendChild(otherBtn)

        });

        props.classList.remove('hidden')
        // postData()
        
       
    }
    
    input.value =  ""
    // clicked = document.querySelector('.checkbox')
    // console.log(clicked);
}

// console.log(checkbox, otherBtn, editBtn, deleteBtn)

addBtn.addEventListener('click', init)


displayTodo.addEventListener('DOMNodeInserted', function(e){
    let listedItems = displayTodo.querySelectorAll('.listed-items')
    // console.log(listedItems);
    listedItems.forEach(element => {
    // listedItems.addEventListener('click', function(e){
        element.addEventListener('click', function(e){
            if(e.target.dataset.check){
                completed.append(element)
                console.log('Checked');
            }else if(e.target.dataset.edit){
                console.log('edited');
            }else if(e.target.dataset.delete){
                displayTodo.removeChild(element)
            }
        // if(e.target && e.target.className == 'editBtn'){
        //     // e.target.forEach(element => {
        //         // completed.append(li)
        //         console.log('Edit Button clicked')
        //     // })
        // }else if(e.target && e.target.className == 'deleteBtn'){
        //     // displayTodo.remove(listedItem)
        //     console.log('Delete Button clicked')
        // }else if(e.target && e.target.className == 'checkbox'){
        //     console.log('Checkbox is checked')
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


async function postData(){
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





