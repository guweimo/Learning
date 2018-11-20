class MxtanLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {
    }
}

class MxtanParticle extends MxtanImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        let factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class MxtanParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }
    update() {
        this.duration--
        
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            let p = MxtanParticle.new(this.game)
            // 设置初始化坐标
            let s = 2
            let vx = randomBetween(-s, s)
            let vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for(let p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // TODO, 这是一个临时的方案
            // 应该从scene中删除自己
            return
        }
        for(let p of this.particles) {
            p.draw()
        }
    }
}

class SceneTitle extends MxtanScene {
    constructor(game) {
        super(game)
        var label = MxtanLabel.new(game, 'hello')
        this.addElement(label)

        let ps = MxtanParticleSystem.new(game)
        this.addElement(ps)
    }
}
