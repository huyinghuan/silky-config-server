
const _crypto = require('crypto');
const _fs = require('fs');

module.exports = function(filename, cb){
  let hash = _crypto.createHash('sha256');
  let input = _fs.createReadStream(filename);
  input.on('readable', () => {
    var data = input.read();
    if (data)
      hash.update(data);
    else {
      cb(null, hash.digest('hex'))
    }
  });
  input.on('error', (error)=>{
    cb(error)
  })
}

