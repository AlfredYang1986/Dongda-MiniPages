// pages/mission/mission.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScroll: false,
        hint: false,
        businessList: [
            // {
            //     address: "打发打发立刻决定发链接打发打发立刻决定发链",
            //     brand_name: "打发打发立刻决定发链打发打发立刻决定发链",
            //     date: 156476123,
            //     description: "dalfjda代付款垃圾袋sofais地方啦开始的减肥肯德基",
            //     difference: ["专业东西", "很好好好"],
            //     festival: "dfakldfdlakjf",
            //     fonund_date: "2016.04.01",
            //     isPaid: 1,
            //     is_checked: 1,
            //     is_top: 1,
            //     logo: "avatar_default@2x.png",
            //     onepunchline: "onepunchline",
            //     service_leaf: "足球",
            //     service_type: "运动",
            //     story: "番小茄的成立和创始人任昕昕的第一个宝宝有关,小孩两三岁的时候体质非常虚弱,经常发烧、感冒、咳嗽,那个时候也在创业,做的成人推拿,推拿老师就说“试试小儿推拿吧”,三个月的时间,小孩的体质明显得到提升,印"
            // }, {
            //     address: "打发打发立刻决定发链接",
            //     brand_name: "的法律的几番",
            //     date: 156476123,
            //     description: "dalfjda代付款垃圾袋sofais地方啦开始的减肥肯德基",
            //     difference: ["专业东西", "很好好好","这是五个字"],
            //     festival: "dfakldfdlakjf",
            //     fonund_date: "2016.04.01",
            //     isPaid: 1,
            //     is_checked: 0,
            //     is_top: 0,
            //     logo: "avatar_default@2x.png",
            //     onepunchline: "onepunchline",
            //     service_leaf: "tuina",
            //     service_type: "dfad",
            //     story: "番小茄的成立和创始人任昕昕的第一个宝宝有关,小孩两三岁的时候体质非常虚弱,经常发烧、感冒、咳嗽,那个时候也在创业,做的成人推拿,推拿老师就说“试试小儿推拿吧”,三个月的时间,小孩的体质明显得到提升,印"
            // }
        ],
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
    },
    // 显示提示
    showHint: function () {
        const that = this;
        wx.hideLoading();
        that.setData({
            hint: true
        })
    },
    // 关闭提示
    closeHint: function () {
        this.setData({
            hint: false
        });
        wx.navigateBack({
            delta: 1,
        })
    },
    // didi
    didiCoupon: function () {
        // console.log("didi");
        wx.navigateTo({
            url: '../../pages/didi/didi',
        })
    },
    // 查看星耀商家
    checkStarDetail: function (e) {
        var that = this;
        console.log(e);
        var id = e.currentTarget.dataset.brandid
        // var id = that.data.
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
        // wx.showLoading({
        //     title: '获取数据中...',
        // })
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
                console.log(res.data.result);
                if(res.data.result.providers.length === 0) {
                    that.showHint();
                } else {
                    that.setData({
                        businessList: res.data.result.providers
                    });
                }
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
        return {
            title: '咚哒头号玩家',
            path: '/pages/index/index',
            imageUrl: 'https://dongdakid.com/assets/images/activity.png'
        }
    }
})