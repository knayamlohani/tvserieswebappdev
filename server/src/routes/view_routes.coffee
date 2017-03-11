express = require 'express'
router  = express.Router();


router.get '/', (req, res, next) ->
  res.render 'app/app', {title: 'TV Series'}

module.exports = router