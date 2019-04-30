document.addEventListener('DOMContentLoaded', function (event) {
    set_snack_labal();
    //randomize_settings();
    //initialize_keys();
    initialize_settings();
});

function submitControl() {
    event.srcElement.value = event.code;
    event.preventDefault();
}
function set_snack_labal() {
    var snacks = document.getElementById("settings_snack_labal");
    snacks.textContent = "Snacks quantity: " + document.getElementById("setting_snacks").value;
}

function initialize_settings() {
    var up = document.getElementById("setting_up");
    up.value = null;
    var down = document.getElementById("setting_down");
    down.value = null;
    var left = document.getElementById("setting_left");
    left.value = null;
    var right = document.getElementById("setting_right");
    right.value = null;

    var time = document.getElementById("setting_time");
    time.value = null;

    var snacks = document.getElementById("setting_snacks");
    snacks.value = 70;
    set_snack_labal();

    var monsters = document.getElementById("setting_monsters_num");
    monsters.value = 2;

    var color_5 = document.getElementById("setting_5_color");
    color_5.value = "#ff0000";

    var color_15 = document.getElementById("setting_15_color");
    color_15.value = "#27AE60";

    var color_25 = document.getElementById("setting_25_color");
    color_25.value = "#F1C40F";


}

function initialize_keys() {
    var up = document.getElementById("setting_up");
    up.value = "ArrowUp";
    var down = document.getElementById("setting_down");
    down.value = "ArrowDown";
    var left = document.getElementById("setting_left");
    left.value = "ArrowLeft";
    var right = document.getElementById("setting_right");
    right.value = "ArrowRight";
}

function randomize_settings() {
    initialize_keys();

    var time = document.getElementById("setting_time");
    time.value = get_random_between(60, 60 * 5);

    var snacks = document.getElementById("setting_snacks");
    snacks.value = get_random_between(50, 90);
    set_snack_labal();

    var monsters = document.getElementById("setting_monsters_num");
    monsters.value = get_random_between(1, 3);

    var color_5 = document.getElementById("setting_5_color");
    color_5.value = getRandomColor();

    var color_15 = document.getElementById("setting_15_color");
    color_15.value = getRandomColor();

    var color_25 = document.getElementById("setting_25_color");
    color_25.value = getRandomColor();
}

function get_random_between(min_val, max_val) {
    return Math.round(Math.random() * (max_val - min_val) + min_val);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
