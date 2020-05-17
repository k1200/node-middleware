const middleware = (req, res, next) => {
    // TODO
    console.log(req.query)
    next()
  }
  module.exports = middleware