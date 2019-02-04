const api = 'https://jsonplaceholder.typicode.com/users';
const usersList = document.getElementById('usersList');

function createNode(element) {
    return document.createElement(element);
}

function appendNode(parent, element) {
    return parent.appendChild(element);
}

async function getAllUsers() {
    const response = await fetch(api, {});
    const json = await response.json();
    return json;
}

(async function(){
    let users = await getAllUsers();
    users.forEach( element => {
        li = createNode('li')
        userName = element.name.toString();
        p = createNode('p');
        p.innerHtml = userName;
        
        // appendNode(li, p);
        // appendNode(usersList, li);
    })
  })();
// fetch(api)
// .then((response) => response.json())
// .then(function(data) {
//     return data.map(function(user){
//         console.log(user)
//     })
// });
