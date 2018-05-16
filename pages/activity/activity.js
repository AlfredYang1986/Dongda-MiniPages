// pages/activity/activity.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        animationData: {},
        userAvatar:'',
    },
    list: () => {
        wx.navigateTo({
            url: '../lists/lists',
        })
    },
    scanQr: function () {
        wx.scanCode({
            success: (res) => {
                console.log(res.path);
                wx.navigateTo({
                    url: "../../" + res.path,
                })
            }
        })
    },
    colorEggs: () => {
        wx.navigateTo({
            url: '../score/score',
        })
    },
    mission: () => {
        wx.getLocation({
            success: function (res) {
                console.log(res);
                wx.navigateTo({
                    url: '../mission/mission?latitude=' + res.latitude + '&longitude=' + res.longitude,
                })
            },
            fail: (error) => {
                console.log(error);
                wx.getSetting({
                    success: (res) => {
                        console.log(res.authSetting['scope.userLocation']);
                        if (!res.authSetting['scope.userLocation']) {
                            wx.showModal({
                                title: '需要获取位置',
                                content: '请允许获取地理位置，才能更好地向您推荐距离您近的任务',
                                success: (res) => {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: (res) => {
                                                console.log(res);
                                            }
                                        })
                                    } else {
                                        wx.navigateTo({
                                            url: "../mission/mission?latitude=39.9219&longitude=116.44355",
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    question: () => {
        // wx.navigateTo({
        //     url: '../question/question',
        // })
        wx.showModal({
            title: '即将推出',
            content: '敬请期待',
            showCancel: false,
        })
    },
    // 返回
    backBeforePage: function () {
        console.log('back')
        wx.navigateBack({
            delta: 1
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
        // var animation = wx.createAnimation({
        //     duration: 1600,
        //     timingFunction: 'ease',
        // })

        // this.animation = animation

        // animation.scale(1.5, 1.5).opacity(0).step()
        // animation.scale(1, 1).opacity(1).step()
        // this.setData({
        //     animationData: animation.export()
        // })
        // setInterval(function () {
        //     console.log("donghua");
        //     animation.scale(1.5, 1.5).opacity(0).step({ duration: 1600 }).scale(1, 1).opacity(1).step({ duration: 10 })
        //     this.setData({
        //         animationData: animation.export()
        //     })
        // }.bind(this), 1010)
        // setTimeout(function () {
        //     animation.translate(30).step()
        //     this.setData({
        //         animationData: animation.export()
        //     })
        // }.bind(this), 1600)
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