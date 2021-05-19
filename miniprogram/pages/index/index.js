// miniprogram/pages/index/index.js
import { getQuestion, getNavData } from '../../api/question.js'
import { throttle } from '../../utils/utils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navdata:[],
    scrollToLeft:0,
    activeIndex:0, //默认选中
    content:[],
    pageid:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getNavData(wx).then(res=>{
      this.getTypeList(res.data[this.data.activeIndex]._id)
      this.setData({
        navdata:res.data
      })
    })
  },
  changeContent({target}){ //点击导航
    //获取可视区宽度
    const { curindex } = target.dataset;
    const query = wx.createSelectorQuery(); //选择器
    query.select('.nav').boundingClientRect();
    query.select('#nav-' + curindex).boundingClientRect();
    query.select('.nav').scrollOffset();
    query.exec(res=>{
      const { width } = res[0]; 
      const { left,width:navWidth } = res[1];
      const {scrollLeft} = res[2];
      this.setData({
        activeIndex: curindex,
        scrollToLeft:( (left + scrollLeft) - width / 2) + navWidth / 2
      })
      this.getTypeList(this.data.navdata[curindex]._id,[])
    })
  },
  getTypeList(id,contentList){
    const { content } = this.data;
    //发请求获取typescriot分类数据
    getQuestion(wx, {
        type_id: id,
        pageid:this.data.pageid,
        limit:10
    }).then(res=>{
      this.setData({
        content: contentList ? contentList.concat(res.data) : content.concat(res.data)
      })
    })
  },
  toCreatePage(){
    wx.navigateTo({
      url:'../create/index'
    })
  },
  toDetail({ currentTarget }){
    wx.navigateTo({
      url: '../detail/index?id=' + currentTarget.dataset.detailid,
    });
  },
  scrollUpdate: throttle(function(){
    let { pageid, activeIndex, navdata} = this.data;
    pageid++;
    this.getTypeList(navdata[activeIndex]._id);
    this.setData({
      pageid
    })
  })
})