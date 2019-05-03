var context;
var shape;
var strawberry;

document.addEventListener('DOMContentLoaded', function (event) {
    context = canvas.getContext("2d");
    shape = new Object();
    strawberry = new Object();
});


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
var snack_5_amount;
var snack_15_amount;
var snack_25_amount;
var perfect_score;
var update_counter;
var colision_seconds;
var image_boom;
var image_strawberry;
var colisions;
var corners;
var square_side_size;


function Start() {
    //Game.style.display = 'none';
    set_corners();
    square_side_size = canvas.height / 10;
    colisions = 0;
    lastPressed = 0;
    look_direction = 4
    board = new Array();
    score = 0;
    pac_color = "yellow";
    mouth_diff = 0.15;
    mount_openning = false;
    var cnt = 100;
    var food_remain = snacks_amount;
    var snack_5_remain = Math.round(0.6 * food_remain);
    var snack_15_remain = Math.round(0.3 * food_remain);
    var snack_25_remain = food_remain - snack_15_remain - snack_5_remain;
    snack_5_amount = snack_5_remain;
    snack_15_amount = snack_15_remain;
    snack_25_amount = snack_25_remain;
    perfect_score = Number(snack_5_amount) * 5 + Number(snack_15_remain) * 15 + Number(snack_25_amount) * 25 + 50;
    var monsters_remain = monsters_num;
    var pacman_remain = 1;
    start_time = new Date();
    monsters = new Array();

    update_counter = 1;
    colision_seconds = 2;
    image_boom = new Image();
    image_boom.src = "explosion.png";
    image_strawberry = new Image();
    image_strawberry.src = "strawberry.png";
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
                else if (randomNum <= 1.0 * (snack_5_remain + snack_15_remain) / cnt) {
                    snack_15_remain--;
                    board[i][j] = 15;
                }
                else if (randomNum <= 1.0 * (snack_5_remain + snack_15_remain + snack_25_remain) / cnt) {
                    snack_25_remain--;
                    board[i][j] = 25;
                }
                else if (i != 0 && j != 0 && i != 9 && j != 9 && randomNum < 1.0 * (pacman_remain + snack_5_remain + snack_15_remain + snack_25_remain) / cnt) {
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
    for (i = 0; i < monsters_num; i++) {
        monsters[i] = new Object();
        monsters[i].start = new Object();
        monsters[i].start.x = corners[i].x;
        monsters[i].start.y = corners[i].y;
        monsters[i].x = monsters[i].start.x;
        monsters[i].y = monsters[i].start.y;
        monsters[i].colision = null;
    }
    strawberry.x = corners[3].x;
    strawberry.y = corners[3].y;
    strawberry.eatten = false;
    while (snack_5_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        snack_5_remain--;
    }
    while (snack_15_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 15;
        snack_15_remain--;
    }
    while (snack_25_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 25;
        snack_25_remain--;
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

function set_corners() {
    corners = new Array();
    corners[0] = new Object()
    corners[1] = new Object()
    corners[2] = new Object()
    corners[3] = new Object()
    corners[0].x = 0;
    corners[0].y = 0;
    corners[1].x = 0;
    corners[1].y = 9;
    corners[2].x = 9;
    corners[2].y = 0;
    corners[3].x = 9;
    corners[3].y = 9;

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

function set_settings(setting_up, setting_down, setting_left, setting_right, setting_snacks, settings_5_color, settings_15_color, settings_25_color, setting_time, setting_monsters_num) {
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
    game_username.value = "Username:    " + get_current_username();
    lblScore.value = "SCORE:       " + score + " Points";
    lblTime.value = "TIME:        " + time_remaining + " Seconds";
    colisions_made.value = "COLISIONS:   " + colisions + " out of 3";
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * square_side_size + (square_side_size * 0.5);
            center.y = j * square_side_size + (square_side_size * 0.5);
            if (board[i][j] === 2) {
                Draw_Pacman(look_direction, center);
            } else if (board[i][j] === 5) {
                context.beginPath();
                context.arc(center.x, center.y, square_side_size / 12, 0, 2 * Math.PI); // circle
                context.fillStyle = color_5.value; //color
                context.fill();
            } else if (board[i][j] === 15) {
                context.beginPath();
                context.arc(center.x, center.y, square_side_size / 6, 0, 2 * Math.PI); // circle
                context.fillStyle = color_15.value; //color
                context.fill();
            } else if (board[i][j] === 25) {
                context.beginPath();
                context.arc(center.x, center.y, square_side_size * 0.3, 0, 2 * Math.PI); // circle
                context.fillStyle = color_25.value; //color
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - (square_side_size * 0.5), center.y - (square_side_size * 0.5), square_side_size, square_side_size);
                context.fillStyle = "blue"; //color
                context.fill();
            }
        }
    }
    Draw_Strawberry();
    Draw_monsters();
}

function Draw_Strawberry() {
    if (strawberry.eatten === false) {
        context.drawImage(image_strawberry, strawberry.x * square_side_size, strawberry.y * square_side_size, square_side_size, square_side_size);

    }
}

function Draw_monsters() {
    for (i = 0; i < monsters_num; i++) {
        var image = new Image();
        var pic_num = i + 1;
        image.src = "ghost" + pic_num + ".png";
        context.drawImage(image, monsters[i].x * square_side_size, monsters[i].y * square_side_size, square_side_size, square_side_size);

        if (monsters[i].colision !== null) {
            var now = new Date();
            var time_diff = now - monsters[i].colision.time;
            if (time_diff < 1000 * colision_seconds)
                context.drawImage(image_boom, monsters[i].colision.x * square_side_size, monsters[i].colision.y * square_side_size, square_side_size, square_side_size);
        }
    }
}

function Draw_Pacman(direction, center) {
    context.beginPath();
    var eye_x;
    var eye_y;
    var mouth_loc;

    switch (direction) {
        case 1:
            eye_x = -square_side_size / 4;
            eye_y = -square_side_size / 12;
            mouth_loc = 1.5;
            break;
        case 2:
            eye_x = -square_side_size / 4;
            eye_y = +square_side_size / 12;
            mouth_loc = 0.5;
            break;
        case 3:
            eye_x = -square_side_size / 12;
            eye_y = -square_side_size / 4;
            mouth_loc = 1;
            break;
        case 4:
            eye_x = +square_side_size / 12;
            eye_y = -square_side_size / 4;
            mouth_loc = 0;
            break;

    }
    context.arc(center.x, center.y, (square_side_size * 0.5), (mouth_loc + mouth_diff) * Math.PI, (mouth_loc - mouth_diff) * Math.PI); // half circle
    context.lineTo(center.x, center.y);
    context.fillStyle = pac_color; //color
    context.fill();
    context.beginPath();
    context.arc(center.x + eye_x, center.y + eye_y, square_side_size / 12, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();
}

function UpdateMonsterPosition(monster) {
    var distance = new Object();
    distance.x = shape.i - monster.x;
    distance.y = shape.j - monster.y;

    var distance_direction = new Object();
    distance_direction.x = distance.x / Math.abs(distance.x);
    distance_direction.y = distance.y / Math.abs(distance.y);

    var go_to = new Object();
    go_to.x = monster.x + distance_direction.x;
    go_to.y = monster.y + distance_direction.y;

    var went = false;
    if (shape.i != monster.x) {
        if (board[go_to.x][monster.y] != 4) {
            monster.x = go_to.x;
            went = true;
        }
    }
    if (shape.j != monster.y && !went) {
        if (board[monster.x][go_to.y] != 4) {
            monster.y = go_to.y;
        }
    }
    //Draw_monsters();
}

function Reset() {
    if (interval != null) {
        window.clearInterval(interval);
    }
    if (intervalKeyPressed != null) {
        window.clearInterval(intervalKeyPressed);
    }
    if (interval_mouth_openning != null) {
        window.clearInterval(interval_mouth_openning);
    }
}

function Restart() {
    Reset();
    Start();
}

function CheckColision(x, y) {
    for (i = 0; i < monsters_num; i++) {
        if (monsters[i].x === x && monsters[i].y === y)
            HandleColision(monsters[i]);
    }
}

function HandleColision(monster) {
    score -= 10;
    colisions = Math.min(colisions + 1, 3);
    var t = new Date();
    if (monster.colision === null)
        monster.colision = new Object();
    monster.colision.time = t;
    monster.colision.x = monster.x;
    monster.colision.y = monster.y;
    monster.x = monster.start.x;
    monster.y = monster.start.y;
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = lastPressed;
    var old_x = shape.i;
    var old_y = shape.j;
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

    if (board[shape.i][shape.j] === 5 || board[shape.i][shape.j] === 15 || board[shape.i][shape.j] === 25) {
        score += board[shape.i][shape.j];
    }
    board[shape.i][shape.j] = 2;

    for (i = 0; i < monsters_num; i++) {
        Check_colisions_and_update_someone(old_x, old_y, HandleColision, UpdateMonsterPosition, monsters[i]);
    }
    if (strawberry.eatten === false)
        Check_colisions_and_update_someone(old_x, old_y, handle_strawberry_colision, update_Strawberry_position, strawberry);

    update_counter++;

    var currentTime = new Date();
    time_remaining = Math.max(0, Math.round(((start_time - currentTime) + game_time * 1000) / 1000));

    Draw();
    window.setTimeout(function () { check_EndGame(); }, 0);
    //check_EndGame();
}

function handle_strawberry_colision(strawberry) {
    strawberry.eatten = true;
    score += 50;
}

function update_Strawberry_position(strawberry) {
    if (update_counter % 3 === 0) {
        var direction;
        var new_x = strawberry.x;
        var new_y = strawberry.y;
        do {
            direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case 0:
                    new_y--;
                    break;
                case 1:
                    new_y++;
                    break;
                case 2:
                    new_x--;
                    break;
                case 3:
                    new_x++;
                    break;
            }
        } while (!in_board(new_x) || !in_board(new_y) || board[new_x][new_y] == 4);
        strawberry.x = new_x;
        strawberry.y = new_y;
    }
}

function in_board(num) {
    if (num >= 0 && num <= 9)
        return true;
    return false;
}

function check_EndGame() {
    var time_spent = game_time - time_remaining;
    if (colisions === 3) {
        window.alert("You Lost! you survived only " + time_spent + " seconds!");
        Restart();
    }
    else if (time_remaining === 0) {
        if (score < 150) {
            window.alert("You can do better, you earned only" + score + " points :(");
            Restart();
        }
        else {
            window.alert("We have a winner!!! you earned " + score + " points after " + time_spent + " seconds!");
            Restart();
        }
    }
    else if (score === (perfect_score - colisions * 10)) {
        window.alert("We have a winner!!! you earned " + score + " points after " + time_spent + " seconds!");
        Restart();
    }
}


function Check_colisions_and_update_someone(x, y, handle, update_position, someone) {
    var updated;
    updated = false;
    if (someone.x === shape.i && someone.y === shape.j) {
        if (update_counter % 3 === 0) {
            update_position(someone);
            updated = true;
        }
        if (someone.x === x && someone.y === y) {
            handle(someone);
        }
    }
    if (update_counter % 3 === 0 && !updated) {
        update_position(someone);
        updated = true;
    }
    if (someone.x === shape.i && someone.y === shape.j) {
        handle(someone);
    }

}


