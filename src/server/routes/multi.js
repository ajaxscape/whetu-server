const express = require('express')
const router = express.Router()

/* GET single-player page. */
router.get('/', function (req, res, next) {
  const data = {
    title: 'Whetu: Multi-Player',
    page: 'multi',
    service: `${process.env.EXPANSE_SERVICE || 'ws://localhost:40510'}`
  }
  res.render('game', data)
})

module.exports = router
