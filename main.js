const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const countriesUrl = 'https://restcountries.eu/rest/v2/all';
const usersList = document.getElementById('usersList');
const searchUsersInput = document.getElementById('searchUsersInput');
let usersApi;
let countriesApi;
searchUsersInput.focus();

function createNode(element) {
    return document.createElement(element);
}

function appendNode(parent, element) {
    parent.appendChild(element);
}

//Api call
async function getApi(url) {
    const response = await fetch(url, {});
    const json = await response.json();
    return json;
}

//create users nodes and appends them to a tr
function createNodeTrFromObject(tr, object){
    tr.id = object.id;
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let td = createNode('td');
            switch (key) {
                case 'address':
                case 'company':
                createNodeSelectfromObject(td,object[key]);
                break;
                case 'username':
                td.classList.add('userName');
                default:
                td.innerHTML += ` ${object[key]} `;
            }
            appendNode(tr, td);
        }
        
    }
    let button = createDeleteButton(object.id);
    let td = createNode('td');
    button.classList.add('btnDelete', 'btn', 'btn-danger', 'btn-sm');
    appendNode(td, button);
    appendNode(tr, td);
}

//creates a select node with options from an object
function createNodeSelectfromObject (parent, object) {
    let select = createNode('select');
    appendNode(parent, select);
    for (let key in object) {
        if(object.hasOwnProperty(key)) {
            let option = createNode('option');
            option.innerHTML = object[key];
            appendNode(select, option);
        }
    }
}

//deletes node with id
function deleteNode (id) {
    let e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

//sets a logical delete on the users list.
function deleteUser (id) {
    let found = usersApi.find( element => {
        return element.id == id;
    });
    found.deleted = true;   
}

//creates delete button, which will be appended to each tr 
function createDeleteButton (id) {
    let button = createNode('button');
    button.classList.add('btnDeleteUser');
    button.innerHTML = 'X';
    button.addEventListener("click", () => {
        deleteUser(id);
        deleteNode(id);
    });
    return button;
}

//Creates Users List
(async function(){
    let users = await getApi(usersUrl);
    usersApi = users; //Global var X_X
    users.forEach( element => {
        //Creates a node for each user and sets its id to the one of the user
        let tr = createNode('tr');
        createNodeTrFromObject(tr, element);
        //appends each user tr to the users list
        appendNode(usersList, tr);
    })
  })();

//Populate Countries
(async function (){
    countriesApi = await getApi(countriesUrl);
    countriesApi.forEach( element => {
    let option = createNode('option');
    option.value = element.name;
    appendNode(document.getElementById('countryList'), option);
    })
})();


//Search user from search input
document.getElementById("searchButton").addEventListener( "click", () => {
    let searchValue = document.getElementById("searchUsersInput").value;
    console.log(searchValue);
    Array.from(document.getElementsByClassName("userName")).forEach( e => {
            console.log(e.parentElement);
            if(e.innerHTML.toLowerCase().includes(searchValue.toLowerCase())){
                e.parentElement.style.display = '';
            } else {
                e.parentElement.style.display = 'none';
            }
    });
});

//Returns if an input is valid or not according to its input type. Modifies html accordingly.
function validateInput(errorNode, node) {
    switch(node.type) {
    case 'date':
    case 'tel': 
    case 'text': 
    if(node.id == 'newUserCountry'){ // (?)
        let result = validateCountry(node.value);
        if (!result) {
            errorNode.innerHTML = 'Invalid Country';
            return false;
        }
    }
    if (node.value === '') {
        errorNode.innerHTML = 'Field is required';
        return false;
    } else {
        errorNode.innerHTML = '';
        return true;
    }
    case 'email': 
    //Email validation using regular expression
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(node.value).toLowerCase())){
        errorNode.innerHTML = "";
        return true;
    } else {
        errorNode.innerHTML = "Invalid email address";
        return false;
    }
    default: 
    break;
    }
}

//validates if country input is on country list
function validateCountry(input) {
    result = countriesApi.find(e => {
        if (e.name.toLowerCase() == input.toLowerCase()){
            return true;
        } else {
            return false;
        }
    });
    return result;
}

//Verifies if an element has a valid input or not.
function validateInputElement (element) {
    let node = document.getElementById(element.id);
    let errorNode = document.getElementById(element.id + 'Error');
    let result = validateInput(errorNode, node);
    return result;
}

//Adds event onFocusOut for each element of the newUser form
Array.from(document.getElementsByClassName("newUser")).forEach(element => {
    element.addEventListener('focusout', () => {
        validateInputElement(element);
    });
});

//Adds event onClick for the create new user button.
document.getElementById("btnCreateNewUser").addEventListener("click", () => {
    var result = Array.from(document.getElementsByClassName("newUser")).every(element => {
        let innerResult = validateInputElement(element);
        if (innerResult) {
            return true;
        } else {
            return false; 
        }
    });
    if (result) {
        newUser = createNewUser();
        usersApi.push(newUser);
        clearNewUserInputs();
    }
}); 

//Creates new user object from modal imputs and respective html elements.
function createNewUser () {
    let firstName = document.getElementById('newUserFirstName').value;
    let lastName = document.getElementById('newUserLastName').value;
    let email = document.getElementById('newUserEmail').value;
    let birth = document.getElementById('newUserBirth').value;
    let country = document.getElementById('newUserCountry').value;
    let phone = document.getElementById('newUserPhone').value;

    let newUser = {
        id: usersApi.length+1,
        name: `${firstName} ${lastName}`,
        username: `${firstName}${lastName}`,
        email,
        address: {}, 
        phone,
        birth,
        country,
    }
    let tr = createNode('tr');
    tr.classList.add();
    createNodeTrFromObject(tr, newUser);
    appendNode(usersList, tr);

    return newUser;
}

//clears the input value of an html element
function clearInputNode (element) {
    element.value = '';
}

//clears input from newUser modal
function clearNewUserInputs () {
    Array.from(document.getElementsByClassName("newUser")).forEach(element => {
        clearInputNode(element);
    });
}