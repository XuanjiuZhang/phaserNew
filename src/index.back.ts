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
  console.log('getCoinPathByGroup', pathPoints)
  pathPoints.forEach(element => {
    path.lineTo(element.x, element.y)
  })
  console.log(path)
  
  return path

  // const levelPossibles = []
  // group.forEach(level => {
  //   // level.reduce((aPoint, bPoint) => {
  //   //   return {
  //   //     x: (aPoint.x + bPoint.x) / 2,
  //   //     y: (aPoint.y + bPoint.y) / 2
  //   //   } 
  //   // })
  //   const possiblePoints = []
  //   level.forEach((aPoint, index) => {
  //     if (index < level.length - 1) {
  //       possiblePoints.push({
  //         x: (aPoint.x + level[index + 1].x) / 2,
  //         y: (aPoint.y + level[index + 1].y) / 2
  //       })
  //     }
  //   })
  //   levelPossibles.push(possiblePoints)
  // })
  // console.log('levelPossibles', levelPossibles)

  // levelPossibles.forEach(level => {})

  // const points = []  
  // for(let i = 0; i < level; i++) {
  //   // let offset = Math.random() > 0.5 ? -(side / 2) * (pointNum - 1) : (side / 2) * (pointNum - 1)
  // }
}

var dotGroup = new Phaser.GameObjects.Group(global.scene)
var coin

function create() {
  global.scene = this
  // console.log(this)
  // new Image(scene, x, y, texture [, frame])
  this.add.image(400, 300, 'sky')
  const dotPoints = getDotPoints(400, 120, 120, 5)
  _.flatten(dotPoints).forEach(element => {
    const dot = this.physics.add.image(element.x, element.y, 'rec')
    dot.setInteractive(new Phaser.Geom.Circle(0, 0 , 16), Phaser.Geom.Circle.Contains)
    dot.setImmovable()
    dotGroup.add(dot)
  })
  

  // var particles = this.add.particles('red')

  // var emitter = particles.createEmitter({
  //   speed: 100,
  //   scale: { start: 1, end: 0 },
  //   blendMode: 'ADD'
  // })

  coin = this.physics.add.image(400, -500, 'coin')

  console.log('coin', coin)
  coin.setVelocity(0, 50)
  coin.setBounce(0.2, 0.2)
  coin.setCollideWorldBounds(true)
  // coin.setGravityY(1000)
  coin.setInteractive(new Phaser.Geom.Circle(0, 0 , 32), Phaser.Geom.Circle.Contains)

  // emitter.startFollow(logo)

  const path = getCoinPathByGroup(dotPoints, 60)
  console.log('path')

  var particles = this.add.particles('coin')
  var emitter = particles.createEmitter({
    speed: 10,
    scale: { start: 1, end: 0 },
    blendMode: 'MULTIPLY'
  })
  emitter.startFollow(coin)

}

const oncec = _.once(function(obj1, obj2) {
  console.log(obj1, obj2)
  // if (Math.random() > 0.5) {
  //   obj1.setAngularVelocity(-300)
  //   obj1.setVelocityX(50)
  // } else {
  //   obj1.setAngularVelocity(300)
  //   obj1.setVelocityX(-50)
  // }
  console.log(this)
  this.physics.moveTo(obj1, 100, 200, 300)
})

function update ()
{
  this.physics.world.collide(coin, dotGroup, function (obj1, obj2) {
    const moveTox = Math.random() > .5 ? obj1.x - 60 : obj1.x + 60
    const moveToY = obj1.y - 60 * 1.717
    this.physics.moveTo(obj1, moveTox, moveToY, 300)
  }.bind(this))
}