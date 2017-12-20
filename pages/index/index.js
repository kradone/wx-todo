// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    scrollHeight:0,
    active:1,
    inputValue:'',
    inputData:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight - 106
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //渲染时取本地的列表数据
    wx.getStorage({
      key: 'listData',
      success: function(res) {
        that.setData({
          listData:res.data
        })
      },
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //切换到未完成
  toActiveOne: function (event) {
    var that = this;
    that.setData({
      active: 1,
    })
  },
  //切换到已完成
  toActiveTwo: function (event) {
    var that = this;
    that.setData({
      active: 2,
    })
  },
  //监听键盘输入
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //添加新清单
  addItem: function (event) {
    var that = this;
    if (that.data.inputValue != '') {
      that.data.listData.push({
        label: that.data.inputValue,
        isFinished: false
      })
    };
    that.setData({
      listData: that.data.listData,
      inputData:'',
      inputValue:''
    });
    wx.setStorage({
      key: 'listData',
      data: that.data.listData,
    })
  },
  //改变状态
  changeStatus: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    that.data.listData[index].isFinished = !that.data.listData[index].isFinished;
    that.setData({
      listData: that.data.listData
    });
    wx.setStorage({
      key: 'listData',
      data: that.data.listData,
    })
  },
  //删除元素
  deleteItem: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    that.data.listData.splice(index,1);
    that.setData({
      listData: that.data.listData
    });
    wx.setStorage({
      key: 'listData',
      data: that.data.listData,
    })
  },
})