'use strict'
const _path = require('path')

module.exports = {
  cwd: _path.join(__dirname, "biz"),
  maps:[{
    baseUrl: '/api/',
    map:[
      {
        path: "/p/:projectName/v/:version/h/:hash",
        biz: "project"
      },
      {
        path: "/p/:projectName/v/:version",
        biz: "project"
      },{
        path: "/p/:projectName",
        biz: "project"
      },{
        path: "/config/all",
        biz: "project",
        methods:{
          GET: "getAll"
        }
      }
    ]
  }],
  filter: [{
    path: ['/api/*'],
    biz: 'upload'
  }]
}