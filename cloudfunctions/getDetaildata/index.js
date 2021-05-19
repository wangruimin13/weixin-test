// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {id} = event;
  const db = cloud.database();
  const {data:questionData} = await db.collection('question').doc(id).get();
  if (questionData){
    //找答案
    const {data:answerData} = await db.collection('answer').where({
      question_id:id
    }).get();
    return {
      code:1,
      msg:'success',
      data:{
        questionData,
        answerData
      }
    }
  }
  return {
    code:0,
    msg:'id传递错误，没有该题目'
  }
  
}