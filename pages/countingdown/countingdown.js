// pages/countingdown/countingdown.js
Page({
    data: {
        restDay: 0,
        android: false,
        iosX: false,
    },

    /**
     * 计算时间
     */
    calcDay: function () {
        this.setData({
            restDay: (24 - new Date().getHours())
        })
    },

    /**
     * 返回
     */
    backBeforePage: function () {
        wx.reLaunch({
            url: '../activity/activity'
        })
    },

    testBtn: () => {
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
        return {
            title: '咚哒头号玩家',
            path: '/pages/index/index',
            imageUrl: 'https://dongdakid.com/assets/images/activity.png'
        }
    }

})