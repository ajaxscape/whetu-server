const express = require('express')
const router = express.Router()

/* GET single-player page. */
router.get('/', function (req, res) {
  const scripts = res.locals.webpack
    .filter(({prefix, suffix}) => ['whetu-single-ww', 'whetu-engine'].includes(prefix) && suffix === 'js')
    .map(({file}) => file)
  const styles = res.locals.webpack
    .filter(({suffix}) => suffix === 'css')
    .map(({file}) => file)
  const data = {
    title: 'Whetu: Single-WW-Player',
    page: 'single',
    service: `${process.env.EXPANSE_SERVICE || 'ws://localhost:40510'}`,
    scripts,
    styles
  }
  res.render('game', data)
})

module.exports = router
