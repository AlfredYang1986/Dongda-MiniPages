// pages/replace/replace.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScroll: false,
        businessInfo: {
            address: "请重试...",
            brand_name: "请重试...",
            date: 15612345678,
            description: "请重试...",
            fesvital: '大的说法是独立房间爱上的联发科Joe案件发动机奥拉夫金额哦啊接到了客服哈斯打了付款金额哦啊多了解【哦',
            difference: ['自主研发', '明星教练'],
            found_date: "请重试",
            logo: "avatar_default@2x.png",
            onepunchline: "请重试",
            provider_id: " ",
            service_leaf: "leaf",
            service_type: "运动",
            story: "dfadfasdsfgsdfgsdfgsdfgsd服饰股份的公司分公司如果是大法官是否公司分公司答复讽德诵功是大法官 ",
            short_name: " ",
            festival: "",
            isPaid: 1,
            is_checked: 0,
        }
    },
    // 返回
    backBeforePage: function () {
        wx.navigateBack({
            delta: 1
        })
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
            url: getApp().globalData.httpsAddress +'/provider/query',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                // 隐藏导航栏加载框  
                wx.hideNavigationBarLoading();
                // 停止下拉动作  
                wx.stopPullDownRefresh();
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
                // that.data.businessInfo.difference = res.data.result.provider.difference.split(',');
                // that.setData({
                //     businessInfo: that.data.businessInfo
                // });
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
    getBusinessDetail: function (data) {
        var that = this;
        wx.request({
            url: getApp().globalData.httpsAddress +'/provider/query',
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
                // that.data.businessInfo.difference = res.data.result.provider.difference.split(',');
                // that.setData({
                //     businessInfo: that.data.businessInfo
                // });
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
        console.log(userId);
        var that = this;

            var data = {
                condition: {
                    wechat_id: open_id,
                    provider_id: options.id
                }
            };

        wx.request({
            url: getApp().globalData.httpsAddress+'/provider/query',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                
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