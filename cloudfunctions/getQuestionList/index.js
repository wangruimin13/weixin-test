// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  event = Object.assign({
    pageid:1,
    limit:15
  },event)
  const { type_id, pageid, limit} = event;
  try{
    const {data} = await db.collection('question').where({
      type: {
        _id: type_id
      },
    }).skip((pageid-1)*limit + 1).limit(limit).get();
    return {
      code:1,
      msg:'success',
      data
    }
  }catch(error){
    return {
      code:0,
      msg:'查询失败',
      data:error
    }
  }
}