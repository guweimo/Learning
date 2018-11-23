
var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        let b = Block(game, p)
        b.x = p[0]
        b.y = p[1]
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
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
            // blocks = loadLevel(game, Number(k))
        } 
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

var __main = function() {
    
    var images = {
        // flappy bird images
        bg: 'img/bird/bg.png',
        pipe: 'img/bird/pipe.png',
        ground: 'img/bird/ground.png',
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
    }

    let request = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            var game = MxtanGame.instance(30, images, function(game) {
                // var s = Scene.new(game)
                var s = SceneTitle.new(game)
                game.runWithScene(s)
            })
        
            enableDebugMode(game, true)
        },
    }
    ajax(request)
    
}

__main()
