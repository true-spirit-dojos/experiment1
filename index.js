import './style.css'

console.log('Top of script')

class Pig {
  constructor() {
    this.walking = true
    this.timestamp = 0
  }
  walk() {
    this.walking = true
  }
  freeze() {
    this.walking = false
  }
  predictPosition(timestamp) {
    if (this.walking) {
      this.timestamp = timestamp
    }
    return { x: 730 - this.timestamp, y: 450 }
  }
}

class Eagle {
  constructor() {
    this.flying = true
    this.timestamp = 0
  }
  fly() {
    this.flying = true
  }
  freeze() {
    this.flying = false
  }
  predictPosition(timestamp) {
    if (this.flying) {
      this.timestamp = timestamp
    }
    return { x: 740 - this.timestamp, y: 50 + ((350 / 750) * this.timestamp % 350) }
  }
}

const pig = new Pig()
const eagle = new Eagle()
console.log('Animals initialized')

function draw(timestamp) {
  if (timestamp === 0) { console.log('Animation started') }

  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const ts = (timestamp / 25 % 750)
  ctx.clearRect(0, 0, 800, 500);
  ctx.save()


  ctx.rect(0, 450, 800, 50)
  ctx.strokeStyle = 'darkgreen'
  ctx.fillStyle = 'mediumseagreen'
  ctx.stroke()
  ctx.fill()
  ctx.beginPath()
  ctx.fillStyle = 'orange'
  ctx.strokeStyle = 'orange'
  ctx.arc(160, 80, 30, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fill()

  ctx.font = '26px sans-serif'
  ctx.fillText('🛸', 20 + ts, 100 + (ts / 23) % 2)
  ctx.font = '60px sans-serif'

  const { x, y } = eagle.predictPosition(ts | 0)
  ctx.fillText('🦅', x, y)

  const { x: pigX, y: piggY } = pig.predictPosition(ts | 0)
  ctx.fillText('🐖', pigX, piggY)

  ctx.restore()

  window.requestAnimationFrame(draw)
}

draw(0)
//

