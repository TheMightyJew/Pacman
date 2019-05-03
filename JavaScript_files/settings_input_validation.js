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

function settings_check() {
    $(function () {
        $("form[name='settings_form']").validate({
            // Specify validation rules
            rules: {
                settings_left: {
                    required: true,
                    different_Buttons: true
                },
                settings_right: {
                    required: true,
                    different_Buttons: true
                },
                settings_up: {
                    required: true,
                    different_Buttons: true
                },
                settings_down: {
                    required: true,
                    different_Buttons: true
                },
                settings_snacks_quantity: {
                    required: true,
                },
                settings_snack_5_color: {
                    required: true,
                    different_Colors: true
                },
                settings_snack_15_color: {
                    required: true,
                    different_Colors: true
                },
                settings_snack_25_color: {
                    required: true,
                    different_Colors: true
                },
                settings_monsters_num: {
                    required: true,
                },
                settings_game_time: {
                    required: true,
                    number: true,
                    higher_60: true
                }
                
            },
            messages: {
                settings_left: {
                    required: "Please enter a button for left move",
                },
                settings_right: {
                    required: "Please enter a button for right move",
                },
                settings_up: {
                    required: "Please enter a button for up move",
                },
                settings_down: {
                    required: "Please enter a button for down move",
                },
                settings_snacks_quantity: {
                    required: "Please enter a snacks quantity",
                },
                settings_snack_5_color: {
                    required: "Please enter a color",
                },
                settings_snack_15_color: {
                    required: "Please enter a color",
                },
                settings_snack_25_color: {
                    required: "Please enter a color",
                },
                settings_monsters_num: {
                    required: "Please enter a monster number",
                },
                settings_game_time: {
                    required: "Please enter a game time",
                    number: "Must be a number",
                }
            },
            // Make sure the form is submitted to the destination defined
            // in the "action" attribute of the form when valid
            submitHandler: function (form) {
                form.submit();
            }
        });
    });
}


$(function () {
    function validateHigher60(value, element, param) {
        if(value<60){
            return false;
        }
        return true;
    }
    jQuery.validator.addMethod("higher_60", validateHigher60, "Game must be at least 60 seconds");

    function differentButtons(value, element, param) {
        var pair1 = $('#settings_left').val() != $('#settings_up').val();
        var pair2 = $('#settings_left').val() != $('#settings_down').val();
        var pair3 = $('#settings_left').val() != $('#settings_right').val();
        var pair4 = $('#settings_right').val() != $('#settings_up').val();
        var pair5 = $('#settings_right').val() != $('#settings_down').val();
        var pair6 = $('#settings_up').val() != $('#settings_down').val();
        return (pair1 && pair2 && pair3 && pair4 && pair5 && pair6);

    }
    jQuery.validator.addMethod("different_Buttons", differentButtons, "All move buttons must be different from each others");

    function differentColors(value, element, param) {
        var pair1 = $('#settings_snack_5_color').val() != $('#settings_snack_15_color').val();
        var pair2 = $('#settings_snack_5_color').val() != $('#settings_snack_25_color').val();
        var pair3 = $('#settings_snack_15_color').val() != $('#settings_snack_25_color').val();
        return (pair1 && pair2 && pair3);

    }
    jQuery.validator.addMethod("different_Colors", differentColors, "All colors must be different from each others");



})