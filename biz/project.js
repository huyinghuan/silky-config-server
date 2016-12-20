'use strict'
const _Base = require('water-pit').Base;
const _getMD5 = require("../lib/getMD5");
const _async = require('async');
const _bean = require('../bean/project');
const _config = require('../config');
const _path = require('path');
const _fs = require('fs');

class Project extends _Base{
  put(req, resp){
    if(!req.file){return resp.sendStatus(403)}
    let clientIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', "");
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

    queue.push((next)=>{
      _bean.save({
        name: projectName,
        version: version,
        hash: fileHash,
        filename: req.file.filename,
        clientIP: clientIP
      }, next)
    });

    _async.waterfall(queue, (error)=>{
      if(error){
        return resp.status(403).send(error.msg || error)
      }
      resp.sendStatus(200)
    })

  }

  get(req, resp){
    console.log(req.params)
    let projectName = req.params.projectName;
    let version = req.params.version;
    //查询数据把文件扔出去
    _bean.get(projectName, version, (error, project)=>{
      if(error){
        console.log(error)
        return resp.sendStatus(500)
      }
      resp.set('Content-Disposition', project.hash)
      let filepath = _path.join(_config.dest, project.filename)
      if(!_path.isAbsolute(_config.dest)){
        filepath = _path.join(process.cwd(), filepath)
      }
      if(_fs.existsSync(filepath)){
        resp.sendFile(filepath)
      }else{
        resp.status(404)
        resp.send("config file lost!")
      }

    })
  }
}

module.exports = new Project()