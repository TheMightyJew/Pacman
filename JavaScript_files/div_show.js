document.addEventListener('DOMContentLoaded', function(event) {
initialize_show();
});
var currently_shown;


function initialize_show() {
    currently_shown = document.getElementById("welcome");
    currently_shown.style.display = "block";
    display_none("Game");
    display_none("login");
    display_none("register");
    display_none("settings");
}

function display_none(str) {
    var curr = document.getElementById(str);
    curr.style = "display: none";
}
function show_welcome() {
    show("welcome");
}
function show_register() {
    show("register");
    register_check();
}

function show_login() {
    show("login");
}
function show_game() {
    show("Game");
}
function show_settings() {
    show("settings");
    initialize_settings();
    settings_check();
}

function show(str) {
    if(currently_shown === document.getElementById("Game")){
        Reset();
    }
    currently_shown.style = "display: none";
    currently_shown = document.getElementById(str);
    currently_shown.style = "display: block";
}
