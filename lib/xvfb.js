const Xvfb = require('xvfb')

module.exports = function xvfb(options) {
  const xvfb = new Xvfb(options)

  function close() {
    return new Promise((resolve, reject) => {
      xvfb.stop(err => (err ? reject(err) : resolve()))
    })
  }

  return new Promise((resolve, reject) => {
    xvfb.start(err => (err ? reject(err) : resolve(close)))
  })
}