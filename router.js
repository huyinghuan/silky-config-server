const _path = require('path')

module.exports = {
  cwd: _path.join(__dirname, "biz"),
  maps:[{
    baseUrl: '/api/',
    map:[
      {
        path: "/p/:projectName/v/:version/h/:hash",
        biz: "project"
      }
    ]
  }],
  filter: [{
    path: ['/api/*'],
    biz: 'upload'
  }]
}