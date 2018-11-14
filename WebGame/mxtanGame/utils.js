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
            log('相撞')
            return true
        }
    }
    return false;
}
