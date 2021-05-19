// miniprogram/pages/detail/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData:{},
    dialogOpen:false,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    this.getDetailData(id);
  },
  getDetailData(id){
    request(wx,{
      name:'getDetaildata',
      data:{
        id
      }
    }).then(res=>{
      wx.setNavigationBarTitle({
        title: res.data.questionData.title
      })
      res.data.answerData = res.data.answerData.map(item=>{
        item.format_time = this.format_time(item.create_time)
        return item;
      })
      this.setData({
        contentData:{
          ...res.data
        }
      })
    })
  },
  format_time(times){
    const timeRes = new Date() - times;  //时间差
    const oneDays = 86400000; //一天的毫秒数
    //2小时前 昨天 2天前 3天前  年月日 小时:分:秒
    const days = Math.floor(timeRes / oneDays);
    //计算小时
    const hours = Math.floor((timeRes % oneDays) / (60 * 60 * 1000));
    //计算分钟
    const minutes = Math.floor((timeRes % oneDays % (60 * 60 * 1000)) / (60 * 1000));
    switch (true){
      case days === 0:
        //分 小时 
        if (hours === 0){
          return minutes === 0 ? '刚刚' : `${minutes}分前`;
        }
        return `${hours}小时前`
      case days === 1:
        return '昨天';
      case days > 1 && days < 4:
        return `${days}天前`;
      case days > 3:
        const createTime = new Date(times);
        return `${createTime.getFullYear()}-${createTime.getMonth() + 1}-${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}:${createTime.getSeconds()}`;
        default :
        return times;
    }
  },
  /**
   * 弹窗显示
   */
  showDialog({detail}){
    if (detail.errMsg === 'getUserInfo:fail auth deny'){
      wx.showToast({
        title:'必须要获取您的信息,否则不能答题',
        icon:'none'
      });
    }else{
      this.setData({
        dialogOpen: true,
        userInfo: detail.userInfo
      })
    }
    
  },
  /**
   * 弹窗显示
   */
  hideDialog() {
    this.setData({
      dialogOpen: false
    })
  },
  /**
   * 发送
   */
  sendDialog({detail}){
    const { contentData, userInfo } = this.data;
    const {content} = detail;
    request(wx,{
      name:'addAnswerData',
      data:{
        content,
        userinfo: userInfo,
        question_id: contentData.questionData._id,
        create_time:Date.now()
      }
    }).then(res=>{
      if(res.code){
        this.hideDialog();
        this.getDetailData(contentData.questionData._id);
      }
    })
  }
})
