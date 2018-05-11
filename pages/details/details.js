// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        businessId: "",
        businessInfo: {
            address: "dxdad",
            brand_name: "儿童宝品牌",
            date: 1526025748479,
            description: "description",
            difference: "this is difference",
            found_date: "this is found date",
            logo: "https://wx.qlogo.cn/mmopen/vi_32/a3IHtceichjtH9d62Zezng3kDqfwN3pzY64bIFtf2q1lfzUduhhDfIlTempgHZDibfOWj3icDrZKMMliaibKuom9dZQ/132",
            onepunchline: "this is one punch line",
            provider_id: "id",
            service_leaf: "football",
            service_type: "运动",
            story: "张三",
            short_name: "15611224455",
        }
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
        var open_id = getApp().globalData.userOpenId;
        wx.showLoading({
            title: '获取数据中...',
        })
        var userId = wx.getStorageSync('userId') || '';
        console.log(userId);
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
            url: 'http://192.168.100.115:9000/checkin',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                if (res.data.result.check_in === "already checked") {
                    wx.showModal({
                        title: '已打卡',
                        content: '请勿多次打卡，没用的',
                        showCancel: false,
                    })
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
                console.log(res.data);
                console.log(that.data.businessInfo)
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