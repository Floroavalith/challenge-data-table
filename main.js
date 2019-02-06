const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const countriesUrl = 'https://restcountries.eu/rest/v2/all';
const usersList = document.getElementById('usersList');
const searchUsersInput = document.getElementById('searchUsersInput');
let usersApi;
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
    let users = await getApi(usersUrl);
    usersApi = users;
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

  //Populate Countries
  (async function (){
      let countries = await getApi(countriesUrl);
      countries.forEach( element => {
        let option = createNode('option')
        option.value = element.name;
        appendNode(document.getElementById('countryList'), option)
      })
  })();


  //Search user from search input
  let searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
        let filteredUsersDiv = document.getElementById('filteredUsersDiv');
        filteredUsersDiv.innerHTML = '';
        let result = usersApi.filter( user => {
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
            appendNode(filteredUsersDiv, node);
        });
    });

//Show new user modal
document.getElementById("btnNewUser").addEventListener("click", () => {
    document.getElementById("newUserModal").style.display = "block";
});

//Create validation function
function validateInput(errorNode, node) {
    switch(node.type) {
        case 'tel': 
        case 'text': 
            if (node.value === '') {
                errorNode.innerHTML = 'Field is required'
            } else {
                errorNode.innerHTML = '';
            }
            break;
        case 'email': 
            //Email validation using regular expression
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(node.value).toLowerCase())){
                errorNode.innerHTML = "";
            } else {
                errorNode.innerHTML = "Invalid email address";
            }
            break;
    }
}

function validateElement (element) {
    let node = document.getElementById(element.id);
    let errorNode = document.getElementById(element.id + 'Error');
    validateInput(errorNode, node);
}

//Adds event onClick for the create new user button.
document.getElementById("btnCreateNewUser").addEventListener("click", () => {
    Array.from(document.getElementsByClassName("newUser")).forEach(element => {
        validateElement(element);
    }); 
});

//Adds event onFocusOut for each element of the form newUser
Array.from(document.getElementsByClassName("newUser")).forEach(element => {
        element.addEventListener('focusout', () => {
            validateElement(element)
        });
}); 

