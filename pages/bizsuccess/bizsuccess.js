// pages/bizsuccess/bizsuccess.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        android: false,
        iosX: false,
    },
    backBeforePage: function () {
        wx.navigateBack({
            delta: 2
        })
    },
    scanQr: function() {
        wx.scanCode({
            success: (res) => {
                console.log(res)
            },
            fail: (error) => {
                wx.showToast({
                    title: '请重试',
                    icon: 'loading',
                    duration: 1600
                })
            }
        })

    },
    contact: function(e) {
        console.log(e)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(getApp().globalData.iosX);
        that.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
        })
        //   wx.getSystemInfo({
        //       success: function (res) {
        //         //   console.log(res.statusBarHeight)
        //         //   console.log(res.model)
        //         //   console.log(res.version)
        //         //   console.log(res.platform)
        //           if (res.platform ==='android') {
        //               that.setData({
        //                   android: true
        //               })
        //           } else {
        //               if(res.model === "iPhone X") {
        //                   that.setData({
        //                       iosX: true
        //                   })
        //               } else {
        //                   that.setData({
        //                       iosX: false
        //                   })
        //               }
        //           }
        //       }
        //   })
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