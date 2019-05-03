var settings_left;
var settings_right;
var settings_up;
var settings_down;
var settings_snacks_quantity;
var settings_snack_5_color;
var settings_snack_15_color;
var settings_snack_25_color;
var settings_monsters_num;
var settings_game_time;

document.addEventListener('DOMContentLoaded', function (event) {
    settings_left = document.getElementsByName("settings_left")[0];
    settings_right = document.getElementsByName("settings_right")[0];
    settings_up = document.getElementsByName("settings_up")[0];
    settings_down = document.getElementsByName("settings_down")[0];
    settings_snacks_quantity = document.getElementsByName("settings_snacks_quantity")[0];
    settings_snack_5_color = document.getElementsByName("settings_snack_5_color")[0];
    settings_snack_15_color = document.getElementsByName("settings_snack_15_color")[0];
    settings_snack_25_color = document.getElementsByName("settings_snack_25_color")[0];
    settings_monsters_num = document.getElementsByName("settings_monsters_num")[0];
    settings_game_time = document.getElementsByName("settings_game_time")[0];

    set_snack_labal();
    initialize_settings();
});

function set_settings(){
    set_game_settings(setting_up, setting_down, setting_left, setting_right, settings_snacks_quantity, settings_snack_5_color, settings_snack_15_color, settings_snack_25_color, settings_game_time, settings_monsters_num);
}

function submitControl() {
    event.srcElement.value = event.code;
    event.preventDefault();
}
function set_snack_labal() {
    var snacks = document.getElementById("settings_snack_labal");
    snacks.textContent = "Snacks quantity: " + settings_snacks_quantity.value;
}

function initialize_settings() {
    settings_left.value = null;
    settings_right.value = null;
    settings_up.value = null; 
    settings_down.value = null;   

    settings_game_time.value = null;

    settings_snacks_quantity.value = 70;
    set_snack_labal();

    settings_monsters_num.value = 2;

    settings_snack_5_color.value = "#ff0000";

    settings_snack_15_color.value = "#27AE60";

    settings_snack_25_color.value = "#F1C40F";


}

function initialize_keys() {
    settings_up.value = "ArrowUp";
    settings_down.value = "ArrowDown";
    settings_left.value = "ArrowLeft";
    settings_right.value = "ArrowRight";
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

    color_5.value = getRandomColor();
    color_15.value = getRandomColor();
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
