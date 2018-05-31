// pages/activity/activity.js
const util = require('../../utils/util.js');
Page({

    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        disabled: true,
        userAvatar: '',
        hasClick: false,
    },

    /**
     * 寻找彩蛋线索
     */
    list: util.throttle(function (e) {
        wx.showLoading({
            title: '正在加载中',
            mask: true,
        })
        wx.getLocation({
            success: function (res) {
                // console.log(res);
                wx.navigateTo({
                    url: '../lists/lists?latitude=' + res.latitude + '&longitude=' + res.longitude,
                })
            },
            fail: (error) => {
                wx.navigateTo({
                    url: "../lists/lists",
                })
            /*
                wx.getSetting({
                    success: (res) => {
                        if (!res.authSetting['scope.userLocation']) {
                            wx.hideLoading();
                            wx.showModal({
                                title: '需要获取位置',
                                content: '请允许获取地理位置,才能更好地向您推荐附近的商家,否则将随机显示。',
                                success: (res) => {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: (res) => {
                                            }
                                        })
                                    } else {
                                        wx.navigateTo({
                                            url: "../lists/lists",
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                */
            }
        })
    }, 1000),

    /**
     * scanQr
     */
    scanQr: util.throttle(function (e) {
        wx.scanCode({
            success: (res) => {
                // console.log(res.path);
                wx.navigateTo({
                    url: "../../" + res.path,
                })
            },
            fail: (error) => {
                // console.log(error);
            }
        })
    }, 1000),

    /**
     * 我的彩蛋
     */
    colorEggs: util.throttle(function (e) {
        wx.navigateTo({
            url: '../score/score',
        })
    }, 1000),

    /**
     * 今日星耀挑战
     */
    mission: util.throttle(function (e) {
        wx.showLoading({
            title: '正在加载中',
            mask: true,
        })
        wx.navigateTo({
            url: '../mission/mission',
        })
    }, 1000),

    /**
     * 返回
     */
    backBeforePage: function () {
        // wx.reLaunch({
        //     url: '../index/index'
        // })
        wx.navigateBack({
            delta: 1,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
            userAvatar: getApp().globalData.wechat_user.wechat_photo
        });
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
        wx.hideLoading();
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