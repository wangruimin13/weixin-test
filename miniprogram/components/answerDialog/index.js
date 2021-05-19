// components/answerDailog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    answerText:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeText({detail}){
      this.setData({
        answerText:detail.value
      })
    },
    closeDialog(){
      this.triggerEvent('close');
    },
    sendDialog(){
      const { answerText } = this.data;
      this.triggerEvent('success',{
        content: answerText
      }) 
    }
  }
})
