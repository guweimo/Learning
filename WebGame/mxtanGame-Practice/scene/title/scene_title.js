class SceneTitle extends MxtanScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var end = Scene(game)
            game.replaceScene(end)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
