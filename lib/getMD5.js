'use strict'
const _crypto = require('crypto');
const _fs = require('fs');

module.exports = function(filename, cb){
  let hash = _crypto.createHash('md5');
  let input = _fs.createReadStream(filename);
  input.on('data', (data) => {
    hash.update(data);
  });
  input.on('end', ()=>{
    cb(null, hash.digest('hex'))
  })
  input.on('error', (error)=>{
    cb(error)
  })
}

