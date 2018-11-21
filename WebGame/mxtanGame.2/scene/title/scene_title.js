class SceneTitle extends MxtanScene {
    constructor(game) {
        super(game)
        var label = MxtanLabel.new(game, 'hello from mxtan')
        this.addElement(label)
        
        let w = MxtanAnimation.new(game)
        w.x = 100
        w.y = 180
        this.w = w
        this.addElement(w)

        this.setupInputs()
    }
    setupInputs() {
        let self = this
        self.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
}
