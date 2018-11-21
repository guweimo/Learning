class MxtanImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipY = false
        this.rotation = 0
    }
    static new(game, name) {
        let i = new this(game, name)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

// 逻辑上来看 不应该继承MxtanImage，但是就暂时这么做吧
