// pages/score/score.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        userAvatar: '',
        hasScores: true,
        scores: {
            scores_A: 1,    // 普通扫码分数
            user_id:"",
            scores_C: 0,    // 答题分数
            scores_B: 0,    // 高级扫码分数
            scores_id: ""
        },
    },
    // 返回
    backBeforePage: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
            userAvatar: getApp().globalData.wechat_user.wechat_photo
        });
        wx.showLoading({
            title: '获取数据中...',
        })
        var open_id = getApp().globalData.userOpenId;
        let data = {
            condition: {
                wechat_id: getApp().globalData.userOpenId
            }
        };
        wx.request({
            url: 'http://192.168.100.115:9000/scores/query',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                console.log(res.data.result)
                console.log(res.data.result.scores);
                if (res.data.result.scores === "not exist") {
                    console.log('not exist')
                    that.setData({
                        hasScores: false
                    });
                } else {
                    that.setData({
                        hasScores: true,
                        scores: res.data.result.scores
                    });
                }
                
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败',
                    confirmText: '重新获取',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            that.onLoad();
                        }
                    }
                })
            }
        })
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