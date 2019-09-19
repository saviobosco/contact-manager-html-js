/**** Main javascript file */

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
        // check if the element exists in the ui
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
}
});