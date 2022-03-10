'use strict'

let addBtn = document.querySelector('.addBtn')
let input = document.querySelector('input')
let props = document.querySelector('.active')
let addNew = document.querySelector('.add-new')
let filterSearch = document.querySelector('.filterSearch')
let displayTodo = document.querySelector('.displayTodo')
// let btn = document.querySelector('.btn')
let newArr, li, checkbox, otherBtn, editBtn, deleteBtn;
const complete = false
let p = document.createElement('p')


const init = () => {
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


    if(inputValue === "" || input.value[0] === ' '){
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
        postData()
        
       
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


// let body = {}

async function fetchAPI() {
    

    let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/`, {
        "method": "GET",
        // body: JSON.stringify({
        //     id:"1", 
        //     description: "Kelechi Egekenze"
        // }),
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })

    let data = await response.json()
    // deletePosts(data.data)
    console.log(data.data);
    return data.data
}

fetchAPI()


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

// async function deletePosts(data){
//     let reply 

//     data.forEach(element => {
//         reply = element.id
//         console.log(reply);
//     });

//     console.log(reply);
    
//     let response = await fetch(`http://todo-app-keicee.herokuapp.com/api/todos/${reply}`, {
//         "method": "DELETE",
//         "headers": {
//             "Content-Type": "application/json; charset=UTF-8"
//         },
        
//     })
    

//     let datas = await response.json()
//     // console.log(datas)
// }



