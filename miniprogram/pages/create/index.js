// miniprogram/pages/create/index.js
import { getNavData, addQuestion} from '../../api/question.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navdata: [],
    text:'',
    activeIndex:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getNavData(wx).then(res => {
      this.setData({
        navdata: res.data
      })
    })
  },
  changeContent({ target }){ //点击导航
    const { curindex } = target.dataset;
    this.setData({
      activeIndex: curindex,
    })
    console.log(this.data.activeIndex);
  },
  changetext({detail}){
    this.setData({
      text:detail.value
    })
  },
  createQuestion(){
    const { text, activeIndex, navdata} = this.data;
    if(text !== '' && activeIndex !== -1){
      //创建题目 发送云函数
      addQuestion(wx,{
        title:text,
        type:{
          ...navdata[activeIndex]
        } 
      }).then(res=>{
        wx.showToast({
          title: '题目创建成功'
        })
      })
    }else if(text === ''){
      wx.showToast({
        icon:'none',
        title:'请输入标题'
      })
    } else if (activeIndex === -1){
      wx.showToast({
        icon: 'none',
        title: '请选择类型'
      })
    }
  }
  
})