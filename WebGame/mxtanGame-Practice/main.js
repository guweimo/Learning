var __main = function () {
    var game = GuaGame()

    var paddle = Paddle()
    var ball = Ball()

    var blocks = loadLevel(1)

    window.paused = false
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })

    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        let input = event.target
        window.fps = Number(input.value)
        let span = document.querySelector('#current-speed')
        span.innerText = window.fps
    })

    game.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断相撞
        if (paddle.collide(ball)) {
            // ball.speedY *= -1
            ball.bound()
        }

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            // 判断 ball 合 block 相撞
            if (block.collide(ball)) {
                block.kill()
                // block.();
                ball.bound()
            }
        }
    }
    game.draw = function () {
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
    }

}

__main()
