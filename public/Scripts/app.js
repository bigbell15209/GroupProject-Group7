

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

//j





(function(){
    $(".btn-outline-disable").click(function(event){
      if(!confirm("Do you want to make it disable??")) {
        event.preventDefault();
        window.location.assign('/survey-list');
      }
    });


    window.onload = function disable() {
        var boardDisable = document.getElementById('boardDisable');
        boardDisable.onclick = function() { alert('Sorry'); 
        boardDisable.onclick = null;
        window.location.assign('/home');
        }
    };
    })()