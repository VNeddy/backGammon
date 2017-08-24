var wins = []; // 赢法数组
var count = 0; // 赢法种类索引
var my_win = []; // 我方赢法统计数组
var computer_win = []; // 电脑赢法统计数组


for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
// 所有横线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
// 所有竖线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
// 所有斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
// 所有反斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

function computerAi() {
    var my_score = [];
    var computer_score = [];
    var max = 0;
    var u = 0;
    var v = 0;
    for (var i = 0; i < 15; i++) {
        my_score[i] = [];
        computer_score[i] = [];
        for (var j = 0; j < 15; j++) {
            my_score[i][j] = 0;
            computer_score[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (!chessBoard[i][j]) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (my_win[k] == 1) {
                            my_score[i][j] += 200;
                        } else if (my_win[k] == 2) {
                            my_score[i][j] += 400;
                        } else if (my_win[k] == 3) {
                            my_score[i][j] += 2000;
                        } else if (my_win[k] == 4) {
                            my_score[i][j] += 10000;
                        }
                        if (computer_win[k] == 1) {
                            computer_score[i][j] += 220;
                        } else if (computer_win[k] == 2) {
                            computer_score[i][j] += 420;
                        } else if (computer_win[k] == 3) {
                            computer_score[i][j] += 2100;
                        } else if (computer_win[k] == 4) {
                            computer_score[i][j] += 20000;
                        }
                    }
                }
                if (my_score[i][j] > max) {
                    max = my_score[i][j];
                    u = i;
                    v = j;
                } else if (my_score[i][j] == max) {
                    if (computer_score[i][j] > computer_score[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computer_score[i][j] > max) {
                    max = computer_score[i][j];
                    u = i;
                    v = j;
                } else if (computer_score[i][j] == max) {
                    if (my_score[i][j] > my_score[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v, false);
    chessBoard[u][v] = 2;
    // 判断胜负
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computer_win[k]++; // 我方棋子在位置(i,j)的第k种赢法上有几个字
            my_win[k] = 6; // 敌方在位置(i,j)位置的第k种赢法不可能赢
            if (computer_win[k] == 5) {
                setTimeout(function() {
                    gameOver(false);
                }, 200);
                over = true;
            }
        }
    }
    if (!over) {
        me = !me;
    }
}
