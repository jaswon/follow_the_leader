window.onload = function() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    init()
    window.requestAnimationFrame(animate);
}

// init
var cvs = document.getElementById('main')
var ctx = cvs.getContext("2d")

// env variables
var units = []
var segm = 7
var count = 0
var next_count = 1000/segm

function init() {
    // units.push(new Unit())
    units = []
    for (var i = 0 ; i < segm ; i++ ) {
        nextUnit((segm-1-i)/segm)
        ctx.beginPath()
        ctx.moveTo((i+1)/segm*window.innerWidth,0)
        ctx.lineTo((i+1)/segm*window.innerWidth,window.innerHeight)
        ctx.stroke()
    }
}

function update() {
    units.forEach(function(unit) {
        unit.update()
    })
    count++
    if (count >= next_count) {
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        init()
        // nextUnit(0)
        // if (units.length > segm) {
        //     units.shift()
        //     units[0].following = null
        // }
        count = 0
    }
}

function draw(ctx) {
    units.forEach(function(unit) {
        ctx.beginPath();
        ctx.arc(unit.pos.x*window.innerWidth,unit.pos.y*window.innerHeight,10,0,2*Math.PI);
        ctx.fillStyle = unit.color
        ctx.fill();
    })
}

function animate () {
    update()
    draw(ctx)
    window.requestAnimationFrame(animate);
}

// constants
var lerp = .1
var x_off = 10
var step = .001
var theta = 0

function nextUnit(x) {
    var u = new Unit(x,units[units.length - 1])
    u.setColor()
    units.push(u)
}

// objects
var Unit = function(x,following) {
    this.color = 'rgb(0,0,0)'
    this.following = following
    this.pos = {
        x: x,
        y: .5
    }
}

Unit.prototype.setColor = function () {
    this.color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255)+ ',' + Math.floor(Math.random() * 255)+ ')'
};

Unit.prototype.update = function () {
    if (!this.following) {
        this.pos.y = Math.random()
        // this.vel.y = (disp * Math.abs(disp) + (Math.random()-.5) * Math.exp(Math.abs(disp)*-4)) * .01
    } else {
        this.pos.y += (this.following.pos.y - this.pos.y) / 10
    }
    this.pos.x += step
};
