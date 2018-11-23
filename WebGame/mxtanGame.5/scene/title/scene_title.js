class SceneTitle extends MxtanScene {
    constructor(game) {
        super(game)
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
        // mario
        let mario = MxtanNesSprite.new(game)
        this.addElement(mario)
        mario.x = 100
        mario.y = 476
        this.mario = mario

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
    }
    setupInputs() {
        let self = this
        let b = this.mario
        let playerSpeed = 2
        self.game.registerAction('a', function(keyStatus) {
            b.move(-playerSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
