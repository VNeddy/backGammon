var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var me = true; // 棋子颜色，true为黑，false为白
var chessBoard = []; // 棋盘，0为空，1为黑，2为白
var over = false;


window.onload = function() {
    init();

    var new_game = document.getElementById('new_game');
    var back_btn = document.getElementsByClassName('back-btn')[0];
    new_game.onclick = function() {
        init();
    };
    back_btn.onclick = function() {
        if(confirm("您确定要退出游戏吗？")) {
            var opened = window.open('about:blank','_self');
            opened.opener = null;
            opened.close();
        }
    };

    // 鼠标点击事件
    chess.onclick = function(event) {
        if (over || !me) {
            return;
        }
        var x = event.offsetX;
        var y = event.offsetY;
        var i = Math.floor(x / 30);
        var j = Math.floor(y / 30);
        // 棋盘为空才能行棋
        if (!chessBoard[i][j]) {
            oneStep(i, j, me);
            if (me) {
                chessBoard[i][j] = 1;
            } else {
                chessBoard[i][j] = 2;
            }
            // 判断胜负
            for (var k = 0; k < count; k++) {
                if (wins[i][j][k]) {
                    my_win[k]++; // 我方棋子在位置(i,j)的第k种赢法上有几个字
                    computer_win[k] = 6; // 敌方在位置(i,j)位置的第k种赢法不可能赢
                    if (my_win[k] == 5) {
                        setTimeout(function() {
                            gameOver(true);
                        }, 200);
                        over = true;
                    }
                }
            }
            if (!over) {
                me = !me;
                setTimeout(function() {
                    computerAi();
                }, 300);
            }
        }
    };
};

function init() {
    // 初始化棋盘数组
    for (var i = 0; i < 15; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBoard[i][j] = 0;
        }
    }
    for (var i = 0; i < count; i++) {
        my_win[i] = 0;
        computer_win[i] = 0;
    }
    over = false;
    me = true;
    //清除上一次的结果
    clearBoard();
    // 画背景图
    var logo = new Image();
    logo.src = "images/logo.png";
    logo.onload = function() {
        // 图片，起点坐标x，y，终点坐标x，y
        context.drawImage(logo, 0, 120, 450, 200);
        drawChessBoard();
    };
}

//清除棋盘
function clearBoard() {
    context.beginPath();
    context.clearRect(0, 0, 450, 450);
}

// 画棋盘
function drawChessBoard() {
    for (var i = 0; i < 15; i++) {
        context.beginPath();
        context.strokeStyle = "#bfbfbf";
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
    context.fillStyle = "#a9a9a9";
    context.beginPath();
    context.arc(225, 225, 3, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}

// 画棋子
var oneStep = function(i, j, me) {
    // 清除当前路径
    context.beginPath();

    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        // true为黑棋
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    } else {
        // false为白棋
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
    context.closePath();
};

function gameOver(is_win) {
    if (is_win) {
        context.beginPath();
        context.fillStyle = "#f03";
        context.font = "120px Verdana";
        context.fillText("你赢了",50, 270);
    } else {
        context.beginPath();
        context.fillStyle = "#300";
        context.font = "120px Verdana";
        context.fillText("你输了",50, 270);
    }
}
