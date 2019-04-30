var context;
document.addEventListener('DOMContentLoaded', function (event) {
    context = canvas.getContext("2d");
});
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_remaining;
var interval;
var intervalKeyPressed;
var lastPressed;
var look_direction;
var game_time;
var mouth_diff;
var mount_openning;
var interval_mouth_openning;
var key_up;
var key_down;
var key_left;
var key_right;
var snacks_amount;
var monsters_num;
var color_5;
var color_15;
var color_25;
var monsters;


function Start() {
    //Game.style.display = 'none';
    lastPressed = 0;
    look_direction = 4
    board = new Array();
    score = 0;
    pac_color = "yellow";
    mouth_diff = 0.15;
    mount_openning = false;
    var cnt = 100;
    var food_remain = snacks_amount;
    var snack_5_remain=Math.round( 0.6*food_remain );
    var snack_15_remain=Math.round( 0.3*food_remain );
    var snack_25_remain=food_remain - snack_15_remain - snack_5_remain;
    var monsters_remain=monsters_num;
    var pacman_remain = 1;
    start_time = new Date();
    monsters=new Array();

    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)       
        for (var j = 0; j < 10; j++) {
            if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * snack_5_remain / cnt) {
                    snack_5_remain--;
                    board[i][j] = 5;
                } 
                else if (randomNum <= 1.0 * (snack_5_remain+snack_15_remain) / cnt) {
                    snack_15_remain--;
                    board[i][j] = 15;
                }
                else if (randomNum <= 1.0 * (snack_5_remain+snack_15_remain+snack_25_remain) / cnt) {
                    snack_25_remain--;
                    board[i][j] = 25;
                }
                else if (randomNum < 1.0 * (pacman_remain + snack_5_remain+snack_15_remain+snack_25_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    for(i=0;i<monsters_num;i++){
        monsters[i]=new Object();
        var randomX;
        var randomY;
        do {
            randomX=Math.floor(Math.random()*10);
            randomY=Math.floor(Math.random()*10);
        } while (board[randomX][randomY]==2 || board[randomX][randomY]==4);
        monsters[i].x=randomX;
        monsters[i].y=randomY;
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    intervalKeyPressed = setInterval(GetKeyPressed, 10);
    interval = setInterval(UpdatePosition, 150);
    interval_mouth_openning = setInterval(ChangeMouth, 20);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i, j];
}

function ChangeMouth() {
    if (mount_openning) {
        if (mouth_diff >= 0.14)
            mount_openning = false;
        mouth_diff = mouth_diff + 0.01;
    }
    else {
        if (mouth_diff <= 0.02)
            mount_openning = true;
        mouth_diff = mouth_diff - 0.01;
    }
}

function set_settings(setting_up,setting_down,setting_left,setting_right,setting_snacks,settings_5_color,settings_15_color,settings_25_color,setting_time,setting_monsters_num){
    key_up = setting_up.value;
    key_down = setting_down.value;
    key_left = setting_left.value;
    key_right = setting_right.value;
    game_time = setting_time.value;
    snacks_amount = setting_snacks.value;
    monsters_num = setting_monsters_num.value;
    color_5 = settings_5_color;
    color_15 = settings_15_color;
    color_25 = settings_25_color;
    show_game();
    Start();
}


/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[key_up]) {
        lastPressed = 1;
    }
    if (keysDown[key_down]) {
        lastPressed = 2;
    }
    if (keysDown[key_left]) {
        lastPressed = 3;
    }
    if (keysDown[key_right]) {
        lastPressed = 4;
    }
    if (lastPressed != 0) {
        look_direction = lastPressed;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score + " Points";
    lblTime.value = time_remaining + " Seconds";
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                Draw_Pacman(look_direction, center);
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
    Draw_monsters();


}

function Draw_monsters(){
    for(i=0;i<monsters_num;i++){
        var image=new image();
        var pic_num=i+1;
        image.src="ghost"+pic_num+".png";
        context.drawImage(image,i*60,j*60);
    }
}

function Draw_Pacman(direction, center) {
    context.beginPath();
    var eye_x;
    var eye_y;
    var mouth_loc;

    switch (direction) {
        case 1:
            eye_x = -15;
            eye_y = -5;
            mouth_loc = 1.5;
            break;
        case 2:
            eye_x = -15;
            eye_y = +5;
            mouth_loc = 0.5;
            break;
        case 3:
            eye_x = -5;
            eye_y = -15;
            mouth_loc = 1;
            break;
        case 4:
            eye_x = +5;
            eye_y = -15;
            mouth_loc = 0;
            break;

    }
    context.arc(center.x, center.y, 30, (mouth_loc + mouth_diff) * Math.PI, (mouth_loc - mouth_diff) * Math.PI); // half circle
    context.lineTo(center.x, center.y);
    context.fillStyle = pac_color; //color
    context.fill();
    context.beginPath();
    context.arc(center.x + eye_x, center.y + eye_y, 5, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = lastPressed;
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        score++;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_remaining = Math.round(((start_time - currentTime) + game_time * 1000) / 1000);
    if (score >= 20 && time_remaining <= 10) {
        pac_color = "green";
    }
    Draw();
    if (score === Number(snacks_amount)) {
        window.clearInterval(interval);
        window.clearInterval(intervalKeyPressed);
        window.clearInterval(interval_mouth_openning);
        var time_spent = game_time - time_remaining;
        window.alert("Game completed after " + time_spent + " seconds with " + score + " points!");
        Start();
    }
}