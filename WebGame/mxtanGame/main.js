
var loadLevel = function(n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        let b = Block(p)
        b.x = p[0]
        b.y = p[1]
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable) {
    if (!enable) {
        return
    }
    window.paused = false
    // 这是为了 debug
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(Number(k))
        } 
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {
    enableDebugMode(true)

    var score = 0
    var game = GuaGame(30)

    var paddle = Paddle()
    var ball = Ball()

    blocks = loadLevel(1)

    var paused = false
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        if (window.paused) {
            return 
        }
        ball.move()
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用过一个 ball.bound() 来实现
            ball.bound()
        }

        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // 判断 ball 合 block 相撞
            if (block.collide(ball)) {
                block.kill()
                ball.bound()
                // 更新分数
                score += 100
            }
        }
    }
    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        gme.context.fillText('分数：' + score, 10, 290)
    }

}

__main()