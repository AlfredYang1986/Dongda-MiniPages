// pages/mission/mission.js
Page({
    
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScroll: false,
        hint: false,
        businessList: [],
    },

    /**
     * 返回
     */
    backBeforePage: function () {
        wx.navigateBack({
            delta: 1
        })
    },

    /**
     * 监听页面滚动
     */
    onPageScroll: function (res) {
        const that = this;
        if (res.scrollTop > 0) {
            that.setData({
                hasScroll: true,
            })
        } else {
            that.setData({
                hasScroll: false
            })
        }
    },

    /**
     * 显示提示
     */
    showHint: function () {
        const that = this;
        wx.hideLoading();
        that.setData({
            hint: true
        })
    },

    /**
     * 关闭提示
     */
    closeHint: function () {
        this.setData({
            hint: false
        });
        wx.navigateBack({
            delta: 1,
        })
    },

    /**
     * 滴滴
     */
    didiCoupon: function () {
        wx.navigateTo({
            url: '../../pages/didi/didi',
        })
    },

    /**
     * 查看星耀商家
     */
    checkStarDetail: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.brandid
        wx.navigateTo({
            url: '../replace/replace?id=' + id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
        });
        var open_id = getApp().globalData.userOpenId;
        wx.showLoading({
            title: '获取数据中...',
        })
        var userId = wx.getStorageSync('userId') || '';
        var data = {
            condition: {
                wechat_id: open_id,
            }
        }

        wx.request({
            url: getApp().globalData.httpsAddress + '/provider/collection',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                // console.log(res.data.result);
                if (res.data.result.providers.length === 0) {
                    that.showHint();
                } else {
                    that.setData({
                        businessList: res.data.result.providers
                    });
                }
            },
            fail: (error) => {
                wx.hideLoading();
                // console.log(error);
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败，请稍后重试',
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
    // onPullDownRefresh: function () {

    // },

    /**
     * 页面上拉触底事件的处理函数
     */
    // onReachBottom: function () {

    // },

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