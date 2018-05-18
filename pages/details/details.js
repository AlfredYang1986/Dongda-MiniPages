// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScroll: false,
        businessId: "",
        businessInfo: {
            logo: "avatar_default@2x.png",
        }
    },
    // 返回
    backBeforePage: function () {
        // wx.navigateBack({
        //     delta: 1
        // })
        wx.reLaunch({
            url: '../activity/activity'
        })
        // wx.navigateTo({
        //     url: '../activity/activity',
        // })
    },
    // 监听页面滚动
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
        // console.log(res);
    },
    // 下拉刷新
    onPullDownRefresh: function () {
        // 显示顶部刷新图标  
        wx.showNavigationBarLoading();
        var that = this;
        wx.request({
            url: getApp().globalData.httpsAddress+'/checkin',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                // 隐藏导航栏加载框  
                wx.hideNavigationBarLoading();
                // 停止下拉动作  
                wx.stopPullDownRefresh();
                console.log(res.data)
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
                that.data.businessInfo.difference = res.data.result.provider.difference.split(',');
                that.setData({
                    businessInfo: that.data.businessInfo
                });
                // console.log(res.data);
                // console.log(that.data.businessInfo)
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败,请稍后重试',
                    // confirmText: '重新获取',
                    showCancel: true,
                    success: (res) => {
                        if (res.confirm) {
                            // that.onLoad();
                        }
                    }
                })
            }
        })
    },
    // 获取商家详情
    getBusinessDetail: function(data) {
        var that = this;
        wx.request({
            url: getApp().globalData.httpsAddress+'/checkin',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
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
                that.data.businessInfo.difference = res.data.result.provider.difference.split(',');
                that.setData({
                    businessInfo: that.data.businessInfo
                });
                console.log(res.data);
                console.log(that.data.businessInfo)
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败,请稍后重试',
                    // confirmText: '重新获取',
                    showCancel: true,
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
        // console.log(userId);
        var that = this;
        // console.log(!options);
        if (!options) {
            var data = {
                condition: {
                    wechat_id: open_id,
                    brand_name: that.data.businessId
                }
            }
        } else {
            that.setData({
                businessId: options.id
            });
            var data = {
                condition: {
                    wechat_id: open_id,
                    brand_name: options.id
                }
            };
        };

        wx.request({
            url: getApp().globalData.httpsAddress+'/checkin',
            data: data,
            method: 'POST',
            success: (res) => {
                console.log(res.data)
                wx.hideLoading();
                if (res.data.result.check_in === "already checked") {
                    // wx.showModal({
                    //     title: '已打卡',
                    //     content: '请勿多次打卡',
                    //     showCancel: false,
                    // })
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
                // that.data.businessInfo.difference = res.data.result.provider.difference.split(',');
                // that.setData({
                //     businessInfo: that.data.businessInfo
                // });
                console.log(res.data);
                // console.log(that.data.businessInfo)
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败，请稍后重试',
                    // confirmText: '重新获取',
                    // showCancel: true,
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