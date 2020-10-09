// IIFE - Immediately Invoked function expression
(function(){

function Start()
{
    console.log("App started...");

    if(document.title == "Contact Me"){
        console.log("On the Contact page");

        let sendButton = document.getElementById("sendButton");
        let cancelButton = document.getElementById("cancelButton");

        sendButton.addEventListener("click", (event) => {
            event.preventDefault();

            let fullName = document.getElementById("fullName").value;
            let contactNumber = document.getElementById("contactNumber").value;
            let emailAddress = document.getElementById("emailAddress").value;
            let message = document.getElementById("firstName").value;

            console.info('Full Name: ${fullName} ${contactNumber} ${emailAddress} ${message}');
        });

        cancelButton.addEventListener("click", (event) => {
            event.preventDefault();
            if(confirm("Are you sure?"))
            {
                location.href = "/home";
            }
        });
    }
}

window.addEventListener("load", Start);

})();