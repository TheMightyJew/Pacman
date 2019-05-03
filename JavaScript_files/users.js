var users;
var users_num;
var logged_in_user;

var login_username;
var login_password;

var register_username;
var register_password;
var register_first_name;
var register_last_name;
var register_email;
var register_birthday;

document.addEventListener('DOMContentLoaded', function (event) {
    users_num=0;
    logged_in_user;
    users=new Array();

    var user= new Object();
    user.username="a";
    user.password="a";
    add_user(user);

    login_username=document.getElementsByName("login_username")[0];
    login_password=document.getElementsByName("login_password")[0];

    register_username=document.getElementsByName("register_username")[0];
    register_password=document.getElementsByName("register_password")[0];
    register_first_name=document.getElementsByName("register_first_name")[0];
    register_last_name=document.getElementsByName("register_last_name")[0];
    register_email=document.getElementsByName("register_email")[0];
    register_birthday=document.getElementsByName("register_birthday")[0];
});

function add_user(user){
    users[users_num]=user;
    users_num++;
}

function check_login() {
    for(i=0;i<users_num;i++){
        if(users[i].username === login_username.value && users[i].password === login_password.value){
            reset_login(login_username,login_password);
            login(users[i]);
            break;
        }
    }
}

function login(user){
    logged_in_user=user;
    show_settings();
}

function reset_login(){
    login_username.value = "";
    login_password.value = "";
}

function username_exists(username){
    for(i=0;i<users_num;i++){
        if(users[i].username === username){
            return true;
        }
    }
    return false;
}

function get_current_username(){
    return logged_in_user.username;
}

function register(){
    var user= new Object();
    user.username= register_username.value;
    user.password= register_password.value;
    reset_register();
    add_user(user);
    login(user);
}

function reset_register(){
    register_username.value = "";
    register_password.value = "";
    register_first_name.value = "";
    register_last_name.value = "";
    register_email.value = "";
    register_birthday.value = "";
}