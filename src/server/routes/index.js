const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const styles = res.locals.webpack
    .filter(({suffix}) => suffix === 'css')
    .map(({file}) => file)
  res.render('index', {
    title: 'Whetu',
    scripts: [],
    styles
  })
})

module.exports = router
