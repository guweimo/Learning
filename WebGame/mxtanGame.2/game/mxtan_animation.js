class MxtanAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (let i = 1; i < 11; i++) {
            let name = `idle${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.width = 100
        this.height = 100
        this.w = 100
        this.h = 100
        this.setSize = true
        for (let i = 1; i < 11; i++) {
            let name = `run${i}`
            let t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
        //
        this.flipX = false
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        let context = this.game.context
        if (this.flipX) {
            context.save()
            
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
    
            context.drawImage(this.texture, this.x, this.y, this.width, this.height)
            context.restore()

        } else {
            context.drawImage(this.texture, this.x, this.y, this.width, this.height)
        }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        let animationNames = {
            down: 'run',
            up: 'idle',
        }
        let name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}