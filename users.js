var users;
var users_num;
var logged_in_user;
document.addEventListener('DOMContentLoaded', function (event) {
    users_num=0;
    logged_in_user=-1;
    users=new Array();
    var user= new Object();
    user.username="a";
    user.password="a";
    add_user(user);
});

function add_user(user){
    users[users_num]=user;
    users_num++;
}

function check_login(login_username,login_password) {
    for(i=0;i<users_num;i++){
        if(users[i].username === login_username.value && users[i].password === login_password.value){
            logged_in_user=i;
            show_settings();
            break;
        }
    }
}