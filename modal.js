var modal;
var btn;
var span;
document.addEventListener('DOMContentLoaded', function (event) {
    // Get the modal
    modal = document.getElementById('myModal');

    // Get the button that opens the modal
    btn = document.getElementById("about_ghost");

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];

    btn.addEventListener("click",btn_clicked);
    span.addEventListener("click",span_clicked);
    window.addEventListener("click",window_clicked);
    addEventListener("keydown", escape_click);

});

function escape_click(e){
    if(e.which == 27){
        modal.style.display = "none";
    }
    
}

function  btn_clicked(){
    modal.style.display = "block";
}


function  span_clicked(){
    modal.style.display = "none";
}


function  window_clicked(event){
    if (event.target == modal) {
        modal.style.display = "none";
    }
}