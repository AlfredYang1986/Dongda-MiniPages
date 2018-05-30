// pages/lists/lists.js
Page({

    data: {
        android: false,
        iosX: false,
        hasScroll: false,
        businessList: [],
        deviceHeight: getApp().globalData.deviceHeight,
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
     * scroll-view 监听页面滚动
     */
    pageScroll: function (res) {
        var that = this;
        if (res.detail.scrollTop > 0) {
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
     * 查看详情
     */
    checkDetail: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.brandid
        wx.navigateTo({
            url: '../replace/replace?id=' + id,
        })
    },

    /**
     * didi
     */
    didiCoupon: function () {
        wx.navigateTo({
            url: '../../pages/didi/didi',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);

        const that = this;
        wx.showLoading({
            title: '获取数据中...',
            mask: true,
        });
        let open_id = getApp().globalData.userOpenId;

        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
        });
        let data = {};
        if (options.longitude) {
            let longitude = parseFloat(options.longitude);
            let latitude = parseFloat(options.latitude);
            
            data = {
                condition: {
                    wechat_id: open_id,
                    pin: {
                        longitude: longitude,
                        latitude: latitude
                    }
                }
            };
        } else {
            data = {
                condition: {
                    wechat_id: open_id,
                }
            };
        }

        wx.request({
            url: getApp().globalData.httpsAddress + '/provider/search',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                // console.log(res.data);
                var resultData = res.data.result.providers;

                that.setData({
                    businessList: resultData
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