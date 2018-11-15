var Block = function(position) {
    var p = position
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 40,
        h: 19,
        alive: true,
    }

    o.kill = function() {
        o.alive = false
    }

    o.collide = function(b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }

    return o
}
