var GuaGame = function(fps, images, runCallBack) {
    // images 是一个对象，里面是图片的引用名字和图片路径
    // 程序会在所有图片载入成功后才运行
    var g = {
        actions: {},
        keydowns: {},
        images: {},
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

    // 
    let loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片都成功载入之后，调用 run
            loads.push(1)
            if (loads.length == names.length) {
                g.run()
            }
        }
        
    }
    g.imageByName = function(name) {
        let img = g.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
        runCallBack(g)
        // 开始运行程序
        setTimeout(function() {
            runloop()
        }, 1000/window.fps)
    }

    return g
}
