class SceneTitle extends MxtanScene {
    constructor(game) {
        super(game)
        // var label = MxtanLabel.new(game, 'hello from mxtan')
        // this.addElement(label)

        // bg
        let bg = MxtanImage.new(game, 'bg')
        this.addElement(bg)
        // 循环移动的地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            let g = MxtanImage.new(game, 'ground')
            g.x = i * 18
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        // bird
        let b = MxtanAnimation.new(game)
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }
    update() {
        super.update()
        // 地面的移动
        this.skipCount--
        let offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 30; i++) {
            let g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        let self = this
        let b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-2, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(2, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
