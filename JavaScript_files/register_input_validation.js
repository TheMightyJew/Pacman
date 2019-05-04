function register_check() {
    $(function () {
        $("form[name='register_form']").validate({
            // Specify validation rules
            rules: {
                register_username: {
                    required: true,
                    unique_username: true
                },
                register_password: {
                    required: true,
                    minlength: 8,
                    contains_letter: true,
                    contains_digit: true
                },
                register_first_name: {
                    required: true,
                    not_contains_digit: true
    
                },
                register_last_name: {
                    required: true,
                    not_contains_digit: true
    
                },
                register_email: {
                    required: true,
                    email: true
                },
                register_birthday: {
                    required: true,
                }
            },
            messages: {
                username:{
                    required: "Please enter a username",
                },
                register_password: {
                    required: "Please enter a password",
                    minlength: "Length must be at least 8",
                    contains_letter: "Must include at least one letter",
                    contains_digit: "Must include at least one digit",
                },
                register_first_name: {
                    required: "Please enter a first name",
                    contains_digit: "Must not contain a digit"
    
                },
                register_last_name: {
                    required: "Please enter a last name",
                    contains_digit: "Must not contain a digit"
    
                },
                register_email: {
                    required: "Please enter an email address",
                    email: "Insert a valid email address"
                },
                register_birthday: {
                    required: "Please enter a birthday date",
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
            return true;
        }
        else {
            return false;
        }
    }
    jQuery.validator.addMethod("contains_digit", validateContainsDigit,"Must not contain a digit");

    function validateNotContainsDigit(value, element, param) {

        if (/\d/.test(value)) {
            return false;
        }
        else {
            return true;
        }
    }
    jQuery.validator.addMethod("not_contains_digit", validateNotContainsDigit,"Must not contain a digit");

    function validateUniqueUsername(value, element, param) {
        return !username_exists(value);
    }
    jQuery.validator.addMethod("unique_username", validateUniqueUsername,"This username is already taken, please pick a different username");
})