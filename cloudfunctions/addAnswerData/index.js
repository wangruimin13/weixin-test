// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  try{
    const res = await db.collection('answer').add({
      data: { ...event }
    });
    const questionItem = db.collection('question').doc(event.question_id);
    console.log(event.question_id);
    //更新题目数量
    const answerNum = await questionItem.get()
    await questionItem.update({
      data:{
        answer: answerNum.data.answer + 1
      }
    });
    return {
      code:1,
      msg:'success',
      data: res
    }
  }catch(error){
    console.log(error);
    return {
      code:0,
      msg:'添加失败',
      data:error
    }
  }
  
}