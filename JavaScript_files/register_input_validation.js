/*$(document ).ready(function () {
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
})*/







function register_check() {
    window.clearInterval(interval);
    /*$('#wrapper').children().hide();
    $('#register').show();
    $.validator.addMethod("pwchecked", function (value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[A-Za-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
    });
    $.validator.addMethod("myemail", function (value) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
    });*/
    $(function () {
        // Initialize form validation on the registration form.
        // It has the name attribute "registration"
        $("form[name='register_form']").validate({
            // Specify validation rules
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
            },
            // Make sure the form is submitted to the destination defined
            // in the "action" attribute of the form when valid
            submitHandler: function (form) {
                form.submit();
            }
        });
    });
}