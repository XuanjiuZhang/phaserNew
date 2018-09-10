import _ from 'lodash'

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
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config)

function preload() {
  this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png')
  this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png')
  this.load.image('coin', 'img/items/coin.png')
  this.load.image('rec', 'img/items/rec.png')
  this.load.image('play', 'img/items/play.png')
}

function getDotPoints(startX, startY, side, level) {
  const points = []
  for(let i = 0; i < level; i++) {
    let pointNum = i + 1
    let leftOffset = -(side / 2) * (pointNum - 1)
    let levelPoints = []
    for(let n = 0; n < pointNum; n++) {
      let point = {
        x: startX + leftOffset + n * side,
        y: startY + i * (side / 2 * 1.732)
      }
      levelPoints.push(point)
    }
    points.push(levelPoints)
  }
  console.log('points', points)
  return points
}

function getCoinPathByGroup(group, gap) {
  if (group.length === 0) {
    return 
  }
  const path = new Phaser.Curves.Path()
  const heightGap = gap * 1.717
  const pathPoints = []
  const firstPoint = group[0][0]
  pathPoints.push(firstPoint)
  group.forEach((element, index) => {
    const point = {
      x: Math.random() > .5 ? pathPoints[index].x - gap : pathPoints[index].x + gap,
      y: pathPoints[index].y + heightGap
    }
    pathPoints.push(point)
  })
  pathPoints.forEach(element => {
    path.lineTo(element.x, element.y)
  })
  console.log(path)
  return pathPoints
}

var dotGroup = new Phaser.GameObjects.Group(global.scene)
var coin

function create() {
  global.scene = this
  this.add.image(400, 300, 'sky')
  const playImage = this.add.image(100, 200, 'play').setInteractive()
  playImage.scaleX = 0.15
  playImage.scaleY = 0.15
  
  const dotPoints = getDotPoints(400, 120, 120, 5)
  _.flatten(dotPoints).forEach(element => {
    const dot = this.physics.add.image(element.x, element.y, 'rec')
    dot.setInteractive(new Phaser.Geom.Circle(0, 0 , 16), Phaser.Geom.Circle.Contains)
    dot.setImmovable()
    dotGroup.add(dot)
  })

  const coin = this.add.sprite(400, 56, 'coin')

  const pathPoints = getCoinPathByGroup(dotPoints, 60)

  const startPlay = () => {
    console.log('startPlay!')
    coin.x = 400
    coin.y = 56
    pathPoints.forEach((point, index) => {
      this.tweens.add({
        targets: coin,
        x: point.x,
        y: point.y - 64,
        duration: 600,
        ease: 'Power1',
        delay: 600 * index,
        onComplete: () => {
          coin.x = point.x
          coin.y = point.y - 64
        }
      })
    })
  }

  startPlay()

  playImage.on('pointerdown', startPlay)

  var particles = this.add.particles('coin')
  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: .2, end: 0 },
    blendMode: 'ADD'
  })
  emitter.startFollow(coin, 0, -32)
}

function update () {
}