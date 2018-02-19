const fs = require('fs')

module.exports = (public_dir) => (req, res, next) => {
  const files = fs.readdirSync(public_dir)
  res.locals.webpack = files.map((file) => {
    const parts = file.split('.')
    let [prefix, hash, suffix] = parts
    if (parts.length > 2) {
      return {file, prefix, hash, suffix}
    } else {
      return {file, prefix, suffix: hash}
    }
  }).filter(({suffix}) => suffix)
  next()
}