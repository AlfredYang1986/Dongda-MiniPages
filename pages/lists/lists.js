// pages/lists/lists.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        android: false,
        iosX: false,
        businessList: [
            {
                address: " ",
                brand_name: "",
                date: 1526025748479,
                description: " ",
                difference: [' ', ' '],
                found_date: " ",
                logo: " ",
                onepunchline: " ",
                provider_id: " ",
                service_leaf: " ",
                service_type: " ",
                story: " ",
                short_name: " ",
            }
        ]
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
        wx.showLoading({
            title: '获取数据中...',
        })
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX
        });
        let data = {
            condition: {
                search: "lists"
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
                // that.setData({
                //     businessList: res.data.result.providers
                // });
                for(let i = 0,len = res.data.result.providers.length; i<len; i++) {
                    resultData[i].difference = resultData[i].difference.split(',');
                }
                // that.data.businessList.difference = res.data.result.provider.difference.split(',');
                that.setData({
                    businessList: resultData
                });
                // console.log(that.data.businessList)
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败，请稍后再次尝试',
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