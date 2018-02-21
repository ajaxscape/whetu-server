const express = require('express')
const router = express.Router()

/* GET single-player page. */
router.get('/', function (req, res) {
  const scripts = res.locals.webpack
    .filter(({prefix, suffix}) => ['whetu-multi'].includes(prefix) && suffix === 'js')
    .map(({file}) => file)
  const styles = res.locals.webpack
    .filter(({suffix}) => suffix === 'css')
    .map(({file}) => file)
  const data = {
    title: 'Whetu: Multi-Player',
    page: 'multi',
    service: `${process.env.EXPANSE_SERVICE || 'ws://localhost:40510'}`,
    scripts,
    styles
  }
  res.render('game', data)
})

module.exports = router
