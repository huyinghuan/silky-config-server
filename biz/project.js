const _Base = require('water-pit').Base;
const _getMD5 = require("../lib/getMD5");
const _async = require('async');

class Project extends _Base{
  put(req, resp){
    if(!req.file){return resp.sendStatus(403)}
    let fileHash = req.params.hash;
    let projectName = req.params.projectName;
    let version = req.params.version;

    let queue = []
    //检验文件是否完整
    queue.push((next)=>{
      _getMD5(req.file.path, (error, md5)=>{
        if(error){
          console.log(error);
          next(new Error({msg: "获取md5码失败"}))
        }
        if(md5 != fileHash){
          new Error({msg: "文件校验失败"})
        }
        next(null)
      })
    });

    _async.waterfall(queue, (error)=>{
      if(error){
        return resp.status(403).send(error.msg || error)
      }
      resp.sendStatus(200)
    })

  }

  get(req, resp){
    let projectName = req.params.projectName;
    let version = req.params.version;
    //查询数据把文件扔出去
  }
}

module.exports = new Project()