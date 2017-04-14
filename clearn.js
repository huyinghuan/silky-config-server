const _bean = require('./bean/project');
_bean.remove((err, result)=>{
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
    process.exit(0)
})