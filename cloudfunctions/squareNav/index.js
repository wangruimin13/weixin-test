// 云函数入口文件
const cloud = require('wx-server-sdk')

//初始化云函数
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const {data} = await db.collection('types').get();
    //获取数据库数据返回
    return {
      code: 1,
      msg: 'success',
      data
    }
  }catch(error){
    return {
      code:0,
      msg:error.errMsg,
      data:error
    }
  }
  
}