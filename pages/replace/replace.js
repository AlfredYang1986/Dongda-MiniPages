// pages/replace/replace.js
Page({
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScroll: false,
        allStory: false,
        businessInfo: {},
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
    },

    /**
     * 预约
     */
    booking: function () {
        const that = this;
        let phoneNo = that.data.businessInfo.book.phoneNo;
        wx.showActionSheet({
            itemList: ['呼叫', '复制号码'],
            success: function (res) {
                if (res.tapIndex === 0) {
                    wx.makePhoneCall({
                        phoneNumber: phoneNo,
                    })
                } else if (res.tapIndex === 1) {
                    wx.setClipboardData({
                        data: phoneNo,
                        success: function (res) {

                        },
                        fail: function (res) { },
                        complete: function (res) { },
                    })
                }
            },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

    /**
     * 显示所有故事
     */
    showAllStory: function () {
        this.setData({
            allStory: !this.data.allStory
        })
    },

    /**
     * 获取商家详情
     */
    getBusinessDetail: function (data) {
        var that = this;
        wx.request({
            url: getApp().globalData.httpsAddress + '/provider/query',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                // console.log(res.data)
                if (res.data.result.check_in === "already checked") {

                } else {
                    wx.showModal({
                        title: '打卡成功',
                        content: '打卡成功',
                        showCancel: false,
                    })
                }
                that.setData({
                    businessInfo: res.data.result.provider
                });
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败,请稍后重试',
                    showCancel: true,
                    success: (res) => {
                        if (res.confirm) {
                            console.log("confirm")
                            wx.navigateBack({
                                delta: 1
                            })
                        } else if (res.cancel) {
                            console.log("cancel")

                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
            }
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
        var open_id = getApp().globalData.userOpenId;
        wx.showLoading({
            title: '获取数据中...',
        })
        var userId = wx.getStorageSync('userId') || '';
        const that = this;

        var data = {
            condition: {
                wechat_id: open_id,
                provider_id: options.id
            }
        };

        wx.request({
            url: getApp().globalData.httpsAddress + '/provider/query',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                that.setData({
                    businessInfo: res.data.result.provider
                });
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败，请稍后重试',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 1
                            })
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
        return {
            title: '咚哒头号玩家',
            path: '/pages/index/index',
            imageUrl: 'https://dongdakid.com/assets/images/activity.png'
        }
    }
})