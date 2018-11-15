var GuaGame = function(fps, loads) {
    // loads 是一个数组，里面是图片的名字
    // 程序会在所有图片载入成功后才运行
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')

    g.canvas = canvas
    g.context = context
    //draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    //events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true;
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false;
    })

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    // timer
    window.fps = 30
    var runloop = function() {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下，调用注册的action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function() {
            runloop()
        }, 1000/fps)
    }

    // 预先载入所有图片
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
    // 开始运行程序
    setTimeout(function() {
        runloop()
    }, 1000/window.fps)

    return g
}
