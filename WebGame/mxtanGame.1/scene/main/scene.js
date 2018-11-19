class Scene extends MxtanScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        let game = this.game
        this.bg = MxtanImage.new(this.game, 'sky')
        this.cloud = MxtanImage.new(this.game, 'cloud')

        this.player = MxtanImage.new(this.game, 'player')
        this.player.x = 100
        this.player.y = 150
        
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
    }
    update() {
        this.cloud.y += 1
        this.cloud.x += 1
    }
}

// var Scene = function (game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)

//     var score = 0

//     var blocks = loadLevel(game, 1)

//     game.registerAction('a', function() {
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function() {
//         paddle.moveRight()
//     })
//     game.registerAction('f', function() {
//         ball.fire()
//     })

//     s.draw = function () {
//         // draw 背景
//         game.context.fillStyle = '#355'
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数：' + score, 10, 290)
//     }
//     s.update = function () {
//         if (window.paused) {
//             return 
//         }
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//             return
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用过一个 ball.bound() 来实现
//             ball.bound()
//         }

//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             // 判断 ball 合 block 相撞
//             if (block.collide(ball)) {
//                 block.kill()
//                 ball.bound()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }

//     // mouse event
//     let enableDrag = false
//     game.canvas.addEventListener('mousedown', function (event) {
//         let x = event.offsetX
//         let y = event.offsetY
//         // 检查是否殿中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function (event) {
//         let x = event.offsetX
//         let y = event.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function (event) {
//         let x = event.offsetX
//         let y = event.offsetY
//         enableDrag = false
//     })
//     return s
// }
