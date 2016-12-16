const _multer = require('multer')
const _config = require('../config')
const _BaseFilter = require('water-pit').BaseFilter;
const _middle = _multer({dest: _config.dest})

class Upload extends _BaseFilter{
  put(req, resp, next){
    _middle.single('config')(req, resp, next)
  }
  post(req, resp, next){
    _middle.single('config')(req, resp, next)
  }
}

module.exports = new Upload()