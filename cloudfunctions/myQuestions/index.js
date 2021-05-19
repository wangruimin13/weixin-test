// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const db = cloud.database();
  try{
    const {data} = await db.collection('question').where({
      open_id: OPENID
    }).get();
    return {
      code:1,
      msg:'success',
      data
    }
  }catch(error){
    return {
      code:0,
      msg:'error',
      data:error
    }
  }
  
  
}