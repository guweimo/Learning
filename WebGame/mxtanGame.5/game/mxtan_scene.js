class MxtanScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        let i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
    }
}
