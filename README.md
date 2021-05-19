# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)



1. 一个页面由四个文件组成
.js  逻辑处理
.wxss  样式
.wxml  结构
.josn  配置

App:启动小程序应用 整个小程序应用调用一次
Page:页面  生命周期
Component：组件


App.js连接云开发能力配置环境id:env
wx 整个微信的全局对象
wx.cloud 云开发能力

App.json:[全局配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)

pages 路由配置（只有一级路由） 数组 页面路由找到.wxml文件名

tabBar 导航配置

pages/.json[页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)


调用云函数 等价 
wx.cloud.callFunction({
    name:云函数名称
})

const db = cloud.database() //连接数据库 返回值是数据库的连接对象
db.collection(集合名称) //返回集合
对集合做增删改查

发ajax接口请求 (没有跨域)
wx.request({
    url:'',
    methods:
    data:
    success(){

    }
})