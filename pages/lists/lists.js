// pages/lists/lists.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        android: false,
        iosX: false,
        hasScroll: false,
        businessList: [
            {
                address: "东外五十六号文创园东外五十六号文创园东外五 ",
                brand_name: "万国击剑",
                date: 1526025748479,
                description: " ",
                difference: [' 自主研发', '明星的教练'],
                found_date: " ",
                logo: "https://wx.qlogo.cn/mmopen/vi_32/a3IHtceichjtH9d62Zezng3kDqfwN3pzY64bIFtf2q1lfzUduhhDfIlTempgHZDibfOWj3icDrZKMMliaibKuom9dZQ/132",
                onepunchline: " ",
                provider_id: " ",
                service_leaf: "leaf",
                service_type: "运动",
                story: " ",
                short_name: " ",
                isPaid: 1,
                is_checked: 0,
            },
            {
                address: "十六号文创园东外五十六号文创园东外五十六号文创园 ",
                brand_name: "万国击剑万国击剑万国击剑万国",
                date: 1526025748479,
                description: " ",
                difference: [' 自主研发', '明星的教练','开心就好啊'],
                found_date: " ",
                logo: "https://wx.qlogo.cn/mmopen/vi_32/a3IHtceichjtH9d62Zezng3kDqfwN3pzY64bIFtf2q1lfzUduhhDfIlTempgHZDibfOWj3icDrZKMMliaibKuom9dZQ/132",
                onepunchline: " ",
                provider_id: " ",
                service_leaf: "leaf",
                service_type: "运动",
                story: " ",
                short_name: " ",
                isPaid: 0,
                is_checked: 1,
            }
        ]
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
    // 查看详情
    checkDetail: function(e) {
        var that = this;
        console.log(e);
        var id = e.currentTarget.dataset.brandid
        // var id = that.data.
        wx.navigateTo({
            url: '../replace/replace?id=' + id,
        })
        // wx.navigateTo({
        //     url: '../details/details',
        // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.showLoading({
            title: '获取数据中...',
        });
        var open_id = getApp().globalData.userOpenId;
        
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
        });
        let data = {
            condition: {
                wechat_id: open_id
            }
        };

        wx.request({
            url: 'http://192.168.100.115:9000/provider/search',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                console.log(res.data);
                var resultData = res.data.result.providers;

                for(let i = 0,len = res.data.result.providers.length; i<len; i++) {
                    resultData[i].difference = resultData[i].difference.split(',');
                }
                that.setData({
                    businessList: resultData
                });
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败，请稍后重试',
                    // confirmText: '重新获取',
                    // showCancel: false,
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