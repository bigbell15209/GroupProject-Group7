(function(){
    function Start()
    {
        console.log("App Started...");
      if(document.title =="Contact")
     {
      let sendButton = document.getElementById("sendButton");      
      let cancelButton = document.getElementById("cancelButton");
      
      sendButton.addEventListener("click", (event) =>{
          event.preventDefault();
      });
      cancelButton.addEventListener("click", (event) =>{
        event.preventDefault();
        if(confirm("Are you sure?"))
        {
            location.href = "/home";
        }
    });
    }
    }

})