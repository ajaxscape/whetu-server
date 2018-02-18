const express = require('express')
const router = express.Router()

/* GET single-player page. */
router.get('/', function (req, res, next) {
  res.render('game', { title: 'Whetu: Multi-Player', page: 'multi' })
})

module.exports = router
