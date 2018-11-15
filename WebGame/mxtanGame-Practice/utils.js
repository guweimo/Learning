var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b)  {
    var o = a;
    if (b.y + o.y && b.y < o.y + b.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            log(b.x, 'b.x')
            log(o.x, 'o.x')
            log(o.image.width, 'o.image.width')

            log('相撞')
            return true
        }
    }
    return false;
}

var loadLevel = function(n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}
