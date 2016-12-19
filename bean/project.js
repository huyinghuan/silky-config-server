const _Coal = require('coal');
const _config = require('../config');
const _coal = new _Coal({database: _config.database, schema: 'schema'}, true);

class Project{
  constructor(){
    this.model = _coal.Model('project', true)
  }
  save(project, cb){
    this.model.save(project).then((result)=>{cb(null, result)}).catch((e)=>{cb(e)})
  }
  get(name, version, cb){
    let sql = "select * from project where name = ?";
    let query = [name]
    if(version){
      sql = `${sql} and version = ?`
      query.push(version)
    }
    sql = `${sql} order by create_at DESC limit 1`
    this.model.sql(sql, query).then((result)=>{cb(null, result[0])}).catch((e)=>{cb(e)})
  }
}

module.exports = new Project()