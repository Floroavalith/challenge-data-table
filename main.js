const url = 'https://jsonplaceholder.typicode.com/users';
const usersList = document.getElementById('usersList');
const searchUsersInput = document.getElementById('searchUsersInput');
let api;
searchUsersInput.focus();

function createNode(element) {
    return document.createElement(element);
}

function appendNode(parent, element) {
    parent.appendChild(element);
}

//Api call
async function getAllUsers() {
    const response = await fetch(url, {});
    const json = await response.json();
    api = json;
    return json;
}

//deletes user node
function deleteUserNode (id) {
    let e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

//create users nodes


//creates select node
function createSelectNode (parent, object) {
    // console.log(parent)
    let select = createNode('select');
    appendNode(parent, select);
    for (let key in object) {
        if(object.hasOwnProperty(key)) {
            let option = createNode('option');
            option.value = object[key];
            option.innerHTML = object[key];
            appendNode(select, option);
        }
    }
    console.log(select)
}

//creates delete button, which will be appended to each li
function createDeleteButton (id) {
    let button = createNode('button');
    button.innerHTML = 'Delete';
    button.addEventListener("click", () => {
        deleteUserNode(id)
    });
    return button;
}


//Creates Users List
(async function(){
    let users = await getAllUsers();
    users.forEach( element => {
        //Creates a node for each user and sets its id to the one of the user
        let li = createNode('li')
        li.id = element.id;
        for (let key in element) {
            if (element.hasOwnProperty(key)) {
                let label = createNode('label');
                label.innerHTML = `${key}: ${element[key]} `;
                switch (key) {
                    case 'username':
                        label.classList.add('userName');
                        break;
                    case 'address':
                    case 'company':
                        createSelectNode(label,element[key])
                        break;
                }
                appendNode(li, label);
            }
            
        }

        let button = createDeleteButton(element.id);
        appendNode(li, button);
        //appends each user li to the users ul
        appendNode(usersList, li);
    })

  })();

  searchUsersInput.addEventListener("keyup", () => {
        let users = document.getElementsByClassName('userName');
            users = Object.values(users);
        const result = users.filter( user => {
            //console.log(searchUsersInput.value.toUpperCase());
            user.innerHTML.toUpperCase().includes(searchUsersInput.value.toUpperCase());
            //console.log(user.innerHTML.toUpperCase().includes(searchUsersInput.value.toUpperCase()));
        });
    });

  function filterUsers() {
    input = document.getElementById('searchUsersInput');
    filter = input.value.toUpperCase();
  }

//ANOTHER POSSIBLE APPROACH!
  
// fetch(api)
// .then((response) => response.json())
// .then(function(data) {
//     return data.map(function(element){
//         li = createNode('li')
//         userName = element.name.toString();
//         p = createNode('p');
//         p.innerHTML = userName;
//         appendNode(li, p);
//         appendNode(usersList, li);
//     })
// });
