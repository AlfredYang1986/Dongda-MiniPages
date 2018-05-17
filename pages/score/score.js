// pages/score/score.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScores: true,
        hasScroll: false,
        hint: false,
        scores: {
            scores_A: 0,    // 普通扫码分数
            user_id:"",
            scores_C: 0,    // 答题分数
            scores_B: 0,    // 高级扫码分数
            scores_D: 0,
            scores_id: "",
        },
    },
    // 返回
    backBeforePage: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    // 检测页面滚动
    onPageScroll: function(res) {
        var that = this;
        if (res.scrollTop > 0) {
            that.setData({
                hasScroll: true
            })
        } else {
            that.setData({
                hasScroll: false
            })
        }
        // console.log(res);
    },
    // 显示提示
    showHint: function() {
        this.setData({
            hint: true
        })

    },
    // 关闭提示
    closeHint: function () {
        this.setData({
            hint: false
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
            url: getApp().globalData.httpsAddress+'/scores/query',
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
                    content: '获取信息失败,请稍后重试',
                    // confirmText: '重新获取',
                    // showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            // that.onLoad();
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