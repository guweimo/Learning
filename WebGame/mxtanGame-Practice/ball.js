var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.stop = function() {
        o.fired = false
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x <= 0 || o.x + o.image.width >= 400) {
                o.speedX = -o.speedX
            }
            if (o.y <= 0 || o.y + o.image.height >= 300) {
                o.speedY = -o.speedY
            }
            if (o.y + o.image.height >= 300 && o.speedY > 0) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    
    o.bound = function() {
        o.speedY *= -1
    }

    return o
}
