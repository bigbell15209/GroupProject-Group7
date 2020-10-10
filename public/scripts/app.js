(function(){
    function Start()
    {
        console.log("App Started...");
      <% if(document.title =="Contact")
     { %>
      let sendButton = document.getElementById("sendButton");      
      let cancelButton = document.getElementById("cancelButton");
      let form = document.forms[0];

      sendButton.addEventListener("click", (event) =>{
          event.preventDefault();

          let fullName = document.getElementById("fullName").value;
          let contactNumber = document.getElementById("contactNumber").value;
          let email = document.getElementById("email").value;
          let message = document.getElementById("message").value;

          console.info(`Full Name: ${fullName}
          Contact Number: ${contactNumber}
          Email Address :${email}
          Message       :${message}`);

          form.reset();
      <% }); %>
      cancelButton.addEventListener("click", (event) =>{
        event.preventDefault();
        if(confirm("Are you sure?"))
        {
            location.href = "/home";
        }
    });
    }
    }
window.addEventListener('load', Start);
})();