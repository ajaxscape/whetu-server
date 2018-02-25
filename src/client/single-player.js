const Render = require('whetu-render')
require('regenerator-runtime/runtime')
const game = require('whetu-engine')

game.start()
let id
let viewport
let radar

document.addEventListener('join', (event) => {
  const data = game.join()
  id = data.id
  document.dispatchEvent(new CustomEvent('joined', {detail: data}))
})

document.addEventListener('player', (event) => {
  const {detail} = event
  viewport = detail.viewport
  radar = detail.radar
  game.update(detail)
})

document.addEventListener('joined', (event) => {
  const {detail} = event
  Render.updatePlayer(detail, (data) => {
    document.dispatchEvent(new CustomEvent('player', {detail: data}))
  })
})

document.addEventListener('state', (event) => {
  const {detail} = event
  detail.forEach((data) => {
    Render.updateBody(data)
  })
  Render.render()
})

document.dispatchEvent(new CustomEvent('join'))

setInterval(async () => {
  if (id && viewport && radar) {
    const data = await game.state(id, viewport, radar)
    document.dispatchEvent(new CustomEvent('state', {detail: data}))
  }
}, 50)