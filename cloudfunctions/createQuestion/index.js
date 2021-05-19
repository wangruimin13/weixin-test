// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {title,type} = event;
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const res = await db.collection('question').add({
    data:{
      title,
      type,
      answer:0,
      open_id: wxContext.OPENID
    }
  });
  return {
    code:1,
    msg:"success",
    data:res
  }
}