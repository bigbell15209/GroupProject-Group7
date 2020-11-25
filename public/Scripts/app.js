

// IIFE - Immediately Invoked function expression
(function(){

function Start()
{
    console.log("App started...");

    let deleteButtons = document.querySelectorAll('.btn-outline-danger')

    for(button of deleteButtons)
    {
       button.addEventListener('click', (event)=>{
           if(!confirm("Are you sure?")){
               event.preventDefault();
               window.location.assign('/survey-list');
           }
       });
    }

}

window.addEventListener("load", Start);

})();