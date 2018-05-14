// pages/countingdown/countingdown.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        restDay: 0,
        android: false,
        iosX: false,
    },
    // 计算时间
    calcDay: function () {
        this.setData({
            restDay: (31 - new Date().getDate())
        })
        // console.log(new Date().getDate())
    },
    // 返回
    backBeforePage: function () {
        console.log('back')
        wx.navigateBack({
            delta: 2
        })
    },
    testBtn: ()=> {
        wx.navigateTo({
            url: '../activity/activity',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
        });
        this.calcDay();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    }
})