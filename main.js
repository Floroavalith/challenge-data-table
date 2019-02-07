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


//create users nodes and appends them to a li
function createNodeLiFromObject(li, object){
    li.id = object.id;
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let label = createNode('label');
            label.innerHTML = ` ${key}: `;
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
            label.classList.add("m-1")
            appendNode(li, label);
        }
        
    }
    let button = createDeleteButton(object.id);
    appendNode(li, button);
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

//deletes node with id
function deleteNode (id) {
    let e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

//sets a logical delete on the users list.
function deleteUser (id) {
    found = usersApi.find( element => {
        return element.id = id;
    });
    found.deleted = true;   
}

//creates delete button, which will be appended to each li
function createDeleteButton (id) {
    let button = createNode('button');
    button.classList.add('btnDeleteUser');
    button.innerHTML = 'Delete';
    button.addEventListener("click", () => {
        deleteUser(id);
        deleteNode(id);
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
                return (user.deleted != true && user.username.toUpperCase().includes(searchUsersInput.value.toUpperCase())) == true ;
            }
        });
        result.forEach(element => {
            //node = user.cloneNode(true); EVENTLISTENERS ARE NOT CLONED.
            // node.childNodes[length].addEventListener("click", () => {
            //     deleteUser(element.id);
            //     deleteNode(element.id);
            // });
            let user = document.getElementById(element.id)
            let node = createNode('div')
            node.innerHTML = user.innerHTML;
            appendNode(filteredUsersDiv, node);
        });
    });
    
    //Returns if an input is valid or not according to its input type. Modifies html accordingly.
    function validateInput(errorNode, node) {
        switch(node.type) {
        case 'date':
        case 'tel': 
        case 'text': 
        if (node.value === '') {
            errorNode.innerHTML = 'Field is required'
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
    
    //Verifies if an element has a valid input or not.
    function validateInputElement (element) {
        let node = document.getElementById(element.id);
        let errorNode = document.getElementById(element.id + 'Error');
        let result = validateInput(errorNode, node);
        return result;
    }
    
    //Adds event onFocusOut for each element of the form newUser
    Array.from(document.getElementsByClassName("newUser")).forEach(element => {
        element.addEventListener('focusout', () => {
            validateInputElement(element)
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
            //hideModal(document.getElementById("newUserModal"));
        }
    }); 
    
    // //Show new user modal
    // document.getElementById("btnNewUser").addEventListener("click", () => {
    //     document.getElementById("newUserModal").style.display = "block";
    // });

    // //Hide new user modal
    // function hideModal (modal) {
    //     modal.style.display = "none";
    // }

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
            birth,
            country,
            phone,
        }
        let li = createNode('li');
        createNodeLiFromObject(li, newUser);
        appendNode(usersList, li);

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
    

    