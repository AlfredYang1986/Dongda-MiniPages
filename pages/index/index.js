//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        activityPage: false,
        targetId: '',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    // 计算时间
    calcDay: function () {
        // console.log(new Date().getMonth() + 1)
        var currentMonth = new Date().getMonth() + 1;
        if (currentMonth === 6) {
            this.setData({
                activityPage: true,
            })
        }

    },
    // canIgetUserInfo
    /*
        canIgetUserInfo: function() {
            console.log('canigetuseinfo');
            console.log(wx.canIUse('button.open-type.getUserInfo'))
            if (!wx.canIUse('button.open-type.getUserInfo')) { // 对应的功能就是通过按钮获取用户资料
                wx.showModal({
                    title: '微信版本太旧',
                    content: '使用旧版本微信，导致无法进入下一步，请前往应用商店进行更新。',
                    showCancel: false,
                }) 
            }
        },
    */
    /*
        // 请求用户存在
        hasUserExist: function (e) {
            // console.log(e.target.id);
            var that = this;
            var openId = app.globalData.userOpenId;
            var data = {
                condition: {
                    wechat_open_id: openId,
                }
            };
            wx.request({
                url: 'http://192.168.100.115:9000/provider/apply/search',
                method: 'POST',
                data: data,
                success: function (res) {
                    wx.hideLoading();
                    let applies = res.data.result.applies;
                    if (applies.length > 0) {
                        app.globalData.userExist = true;
                        if (e.target.id === "activity") {
                            wx.navigateTo({
                                url: '../activity/activity'
                            })
                        } else if (e.target.id === "business") {
                            if (app.globalData.userExist) {
                                wx.navigateTo({
                                    url: '../bizsuccess/bizsuccess'
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../business/business'
                                })
                            }
                        } else if (e.target.id === "player") {
                            if (app.globalData.userExist) {
                                wx.navigateTo({
                                    url: '../bizsuccess/bizsuccess'
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../player/players'
                                })
                            }
                        }
                    } else {
                        app.globalData.userExist = false;
                        if (e.target.id === "activity") {
                            wx.navigateTo({
                                url: '../activity/activity'
                            })
                        } else if (e.target.id === "business") {
                            wx.navigateTo({
                                url: '../business/business'
                            })
    
                        } else if (e.target.id === "player") {
                            wx.navigateTo({
                                url: '../player/players'
                            })
    
                        }
                    }
                },
                fail: function (error) {
                    console.log(error);
                    wx.hideLoading();
                    wx.showModal({
                        title: "网络繁忙",
                        content: '网络繁忙，请稍后再试',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                // wx.navigateBack({
                                //     delta: 1
                                // })
                            }
                        }
                    })
    
                }
            })
        },
    */
    onLoad: function () {
        const that = this;
        getApp().userlogin();
        this.calcDay();
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        wx.showLoading({
            title: '加载资源中...',
        })
        if (e.detail.errMsg == 'getUserInfo:ok') {
            app.globalData.userInfo = e.detail.userInfo;
            app.globalData.wechat_user.wechat_name = e.detail.userInfo.nickName;
            app.globalData.wechat_user.wechat_photo = e.detail.userInfo.avatarUrl;
            wx.setStorageSync('nickName', e.detail.userInfo.nickName);
            wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });
            wx.hideLoading();
            if (this.data.activityPage) {
                wx.navigateTo({
                    url: '../activity/activity',
                })
            } else {
                wx.navigateTo({
                    url: '../countingdown/countingdown',
                })
            }
            // wx.request({}) // 将用户信息、匿名识别符发送给服务器，调用成功时执行 callback(null, res)
        }
        else if (e.detail.errMsg == 'getUserInfo:fail auth deny') { // 当用户点击拒绝时
            wx.hideLoading();
            wx.showModal({
                title: '需要您点击同意',
                content: '点击同意我们才能更好地为您服务',
                showCancel: false,
            }) // 提示用户，需要授权才能登录
            // callback('fail to modify scope', null)
        }
        // app.globalData.userInfo = e.detail.userInfo
        // this.setData({
        //     userInfo: e.detail.userInfo,
        //     hasUserInfo: true
        // });
    },
    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function () {

    }
})
