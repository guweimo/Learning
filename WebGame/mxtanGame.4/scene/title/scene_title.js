class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.pipeRowSpace = 200
        this.columnsOfPipe = 3
        for (let i = 0; i < this.columnsOfPipe; i++) {
            let p1 = MxtanImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.pipeRowSpace
            let p2 = MxtanImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeRowSpace = config.pipe_row_space.value
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < - 100) {
                p1.x += this.pipeRowSpace * this.columnsOfPipe
            }
            if (p2.x < - 100) {
                p2.x += this.pipeRowSpace * this.columnsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
        for (let p of this.pipes) {
        }
    }
    draw() {
        let context = this.game.context
        for (let p of this.pipes) {
            context.save()
            
            let w2 = p.w / 2
            let h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
    
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}

class SceneTitle extends MxtanScene {
    constructor(game) {
        super(game)
        // var label = MxtanLabel.new(game, 'hello from mxtan')
        // this.addElement(label)

        // bg
        let bg = MxtanImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
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
        this.birdSpeed = 2
        let b = MxtanAnimation.new(game)
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
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
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
