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
function deleteNode (id) {
    let e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

//create users nodes
function createNodeLiFromObject(li, object){
    li.id = object.id;
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let label = createNode('label');
            label.innerHTML = `${key}: `;
            switch (key) {
                case 'address':
                case 'company':
                    createNodeSelectfromObject(label,object[key])
                    break;
                case 'username':
                label.classList.add('userName');
                default:
                    label.innerHTML += ` ${object[key]} `;
            }
            appendNode(li, label);
        }
        
    }
}

//creates select node
function createNodeSelectfromObject (parent, object) {
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
}

//creates delete button, which will be appended to each li
function createDeleteButton (id) {
    let button = createNode('button');
    button.innerHTML = 'Delete';
    button.addEventListener("click", () => {
        deleteNode(id)
    });
    return button;
}


//Creates Users List
(async function(){
    let users = await getAllUsers();
    users.forEach( element => {
        //Creates a node for each user and sets its id to the one of the user
        let li = createNode('li')
        createNodeLiFromObject(li, element);
        let button = createDeleteButton(element.id);
        appendNode(li, button);
        //appends each user li to the users ul
        appendNode(usersList, li);
    })
  })();

  //Search user from input
  let searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
        let filteredUsersDiv = document.getElementById('filteredUsersDiv');
        filteredUsersDiv.innerHTML = '';
        let result = api.filter( user => {
            if (searchUsersInput.value == '') {
                return;
            } else {
                return (user.username.toUpperCase().includes(searchUsersInput.value.toUpperCase())) == true ;
            }
        });
        result.forEach(element => {
            let user = document.getElementById(element.id)
            let node = createNode('div')
            node.innerHTML = user.innerHTML;
            console.log(node);
            appendNode(filteredUsersDiv, node);
        });
    });

//Create user form
document.getElementById("btnNewUser").addEventListener("click", () => {
    document.getElementById("newUserModal").style.display = "block";
});

