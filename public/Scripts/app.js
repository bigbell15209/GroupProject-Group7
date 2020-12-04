

// IIFE - Immediately Invoked function expression
(function(){


    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

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


    if(document.title === "Login" || document.title === "Register" || document.title === "result Survey")
    {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
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