// miniprogram/pages/my/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myQuestionList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    this.getMyQuestion();
  },
  getMyQuestion(){
    request(wx,{
      name:'myQuestions'
    }).then(res=>{
      this.setData({
        myQuestionList:res.data
      })
    })
  },
  toDetailPage({currentTarget}){
    wx.navigateTo({
      url: '../detail/index?id='+currentTarget.dataset.id,
    })
  }
})