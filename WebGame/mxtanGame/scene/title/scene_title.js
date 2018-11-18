var SceneTitle = function (game) {
    var s = {
        game: game,
    }
    game.registerAction('k', function() {
        var end = Scene(game)
        game.replaceScene(end)
    })
    // 初始化
    s.draw = function () {
        // draw labels
        game.context.fillText('按 k 开始游戏', 100, 190)
    }
    s.update = function () {

    }

    return s
}
