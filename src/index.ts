var config = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
}

var game = new Phaser.Game(config)

function preload() {
  // this.load.setBaseURL('http://labs.phaser.io')

  this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png')
  this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
  // this.load.image('red', 'assets/particles/red.png')

  this.load.image('coin', 'img/items/coin.png')
  this.load.image('rec', 'img/items/rec.png')
}

function getDotPoints(startX, startY, side, level) {
  const points = []
  for(let i = 0; i < level; i++) {
    let pointNum = i + 1
    let leftOffset = -(side / 2) * (pointNum - 1)
    for(let n = 0; n < pointNum; n++) {
      let point = {
        x: startX + leftOffset + n * side,
        y: startY + i * (side * 1.732)
      }
      points.push(point)
    }
  }
  console.log('points', points)
  return points
}

function create() {
  // global.scene = this
  // console.log(this)
  // new Image(scene, x, y, texture [, frame])
  this.add.image(400, 300, 'sky')
  const dotPoints: any = getDotPoints(400, 300, 100, 2)
  dotPoints.forEach(element => {
    this.physics.add.image(element.x, element.y, 'coin')
  })

  // var particles = this.add.particles('red')

  // var emitter = particles.createEmitter({
  //   speed: 100,
  //   scale: { start: 1, end: 0 },
  //   blendMode: 'ADD'
  // })

  var coin = this.physics.add.image(400, 100, 'coin')

  coin.setVelocity(0, 0)
  coin.setBounce(1, 0.2)
  coin.setCollideWorldBounds(true)

  // emitter.startFollow(logo)
}