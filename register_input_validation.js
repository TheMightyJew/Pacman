$(document ).ready(function () {
    $("#register_form").validate({
        rules: {
            username: {
                required: true,
            },
            password: {
                required: true,
                minlength: 8,
                contains_letter: true,
                contains_digit: true
            },
            first_name: {
                required: true,
                contains_digit: false

            },
            last_name: {
                required: true,
                contains_digit: false

            },
            email: {
                required: true,
                email: true
            },
            birthday: {
                required: true,
            }
        },
        messages: {
            username:{
                required: "Please enter a username"
            }
        }
    })
})
$(function () {
    function validateContainsLetter(value, element, param) {
        if (/[A-Za-z]/.test(value)) {
            return param;
        }
        else {
            return !param;
        }
    }
    jQuery.validator.addMethod("contains_letter", validateContainsLetter, "Please select an option");

    function validateContainsDigit(value, element, param) {

        if (/\d/.test(value)) {
            return param;
        }
        else {
            return !param;
        }
    }
    jQuery.validator.addMethod("contains_digit", validateContainsDigit, "Please select an option");
})