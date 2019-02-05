const api = 'https://jsonplaceholder.typicode.com/users';
const usersList = document.getElementById('usersList');

function createNode(element) {
    return document.createElement(element);
}

function appendNode(parent, element) {
    parent.appendChild(element);
}

//Api call
async function getAllUsers() {
    const response = await fetch(api, {});
    const json = await response.json();
    return json;
}

//deletes user node
function deleteUser (id) {
    let e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

//creates delete button, which will be appended to each li
function createDeleteButton (id) {
    let button = createNode('button');
    button.innerHTML = 'Delete';
    button.addEventListener("click", () => {
        deleteUser(id)
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
        for (var key in element) {
            if (element.hasOwnProperty(key)) {
                let label = createNode('label');
                label.innerHTML = `${key}: ${element[key]} `;
                appendNode(li, label);
            }
        }

        let button = createDeleteButton(element.id);
        appendNode(li, button);

        appendNode(usersList, li);
    })
  })();

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
