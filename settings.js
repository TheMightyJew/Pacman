document.addEventListener('DOMContentLoaded', function(event) {
    set_snack_labal();
    randomize_settings();
    initialize_keys();
});

function submitControl(){
    event.srcElement.value = event.code;
    event.preventDefault();
}
function set_snack_labal(){
    var snacks = document.getElementById("settings_snack_labal");
    snacks.textContent="Snacks quantity: "+document.getElementById("setting_snacks").value;
}

function initialize_keys(){
    var up = document.getElementById("setting_up");
    up.value = "ArrowUp";
    var down = document.getElementById("setting_down");
    down.value = "ArrowDown";
    var left = document.getElementById("setting_left");
    left.value = "ArrowLeft";
    var right = document.getElementById("setting_right");
    right.value = "ArrowRight";
}

function randomize_settings(){
    var time = document.getElementById("setting_time");
    time.value = get_random_between(60, 60*5);

    var snacks = document.getElementById("setting_snacks");
    snacks.value = get_random_between(50, 90);
    set_snack_labal();

    var monsters = document.getElementById("setting_monsters_num");
    monsters.value = get_random_between(1, 3);
}

function get_random_between(min_val, max_val){
    return Math.round(Math.random()*(max_val - min_val) + min_val);
}
