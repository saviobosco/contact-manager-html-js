/**** Main Javascript File */

function Application() {
    this.contacts = [];
}
const App = new Application();
App.addContact = function({id,first_name, last_name, email, phone_number, address}) {
    let contact = {id, first_name, last_name, email, phone_number, address};

    // if the id is empty or null or undefined
    if (! id) {
        contact.id = this.contacts.length + 1;
    } else {
        // remove the previous and replace it.
        App.removeContact(id);
    }
    this.contacts.push(contact);
    return contact;
}
App.removeContact = function(contact_id) {
    this.contacts = this.contacts.filter( c => c.id != contact_id);
}
App.getContact = function(contact_id) {
    return this.contacts.filter( c => c.id == contact_id)[0];
}


let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function(event) {
    // get all inputs and append to the list. 
    event.preventDefault();
    var id = document.getElementById("contact_id");
    var first_name = document.getElementById("first_name");
    var last_name = document.getElementById("last_name");
    var email = document.getElementById("email");
    var phone_number = document.getElementById("phone_number");
    var address = document.getElementById("address");
    // validate the inputs 
    if (first_name.value && last_name.value && email.value && phone_number.value && address.value) {
        // add data to the state 
        let data = {
            id: id.value,
            first_name: first_name.value,
            last_name: last_name.value,
            email : email.value,
            phone_number: phone_number.value,
            address: address.value
        };
        data = App.addContact(data);
        // check if the element exists in the ui
        console.log(data);
        var li = document.getElementById(data.id)
        console.log(li);
        if (li) {
            li.innerHTML = `
            <div>
            <p class="contact_name"> ${first_name.value} ${last_name.value} <span>(${email.value}) </span> </p>
            <p class="contact_phone_number"> ${phone_number.value} </p>
            <address> ${address.value} </address>
            </div>
            <div>
            <span> <i class="fa fa-edit"></i> </span>
            <span> <i class="fa fa-trash"> </i> </span>
            </div>
            `;
        } else {
            // add the data to the ui and clear inputs 
            var allContacts = document.getElementById("all_contacts");
            var li = document.createElement("li");
            li.setAttribute("id", data.id);
            li.innerHTML = `
            <div>
            <p class="contact_name"> ${first_name.value} ${last_name.value} <span>(${email.value}) </span> </p>
            <p class="contact_phone_number"> ${phone_number.value} </p>
            <address> ${address.value} </address>
            </div>
            <div>
            <span> <i class="fa fa-edit"></i> </span>
            <span> <i class="fa fa-trash"> </i> </span>
            </div>
            `;
            allContacts.appendChild(li);
        }

        // clear the inputs
        id.value = ""; 
        first_name.value = "";
        last_name.value = "";
        email.value = "";
        phone_number.value = "";
        address.value = "";
    } else {
        alert("Some fields are missing!.");
    }    
});

var savedContactUl = document.getElementById("all_contacts");
savedContactUl.addEventListener("click", function(event) {
// get the clicked element 
// if the element is trash icon 
// delete the parent li
if (event.target.className === "fa fa-trash" ) {
    let li =  event.target.parentNode.parentNode.parentNode
    let ul = event.target.parentNode.parentNode.parentNode.parentNode;
    ul.removeChild(li);
} else if (event.target.className === "fa fa-edit") {
    let li =  event.target.parentNode.parentNode.parentNode
    let data = App.getContact(li.id);
    
    var first_name = document.getElementById("first_name");
    var last_name = document.getElementById("last_name");
    var email = document.getElementById("email");
    var phone_number = document.getElementById("phone_number");
    var address = document.getElementById("address");
    var id = document.getElementById("contact_id"); 

    id.value = data.id;
    first_name.value = data.first_name;
    last_name.value = data.last_name;
    email.value = data.email;
    phone_number.value = data.phone_number;
    address.value = data.address;
}
});