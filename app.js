//app.js
App({

    hasUserExist: function () {
        var that = this;

        var openId = that.globalData.userOpenId;
        var data = {
            condition: {
                wechat_id: openId,
            }
        };
        wx.request({
            url: 'http://192.168.100.115:9000/login',
            method: 'POST',
            data: data,
            success: function (res) {
                // console.log(res);
                that.globalData.userId = res.data.result.user.user_id;
                wx.setStorageSync('userId', res.data.result.user.user_id);
            },
            fail: function (error) {
                console.log(error);
                wx.showModal({
                    title: "网络繁忙",
                    content: '网络繁忙,请稍后重试',
                    showCancel: false,
                    success: function (res) {

                        // if (res.confirm) {
                        //     wx.navigateBack({
                        //         delta: 2
                        //     })
                        // }
                    }
                })

            }
        })
    },

    onLaunch: function () {
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                // console.log(res.code);
                let code = res.code;
                let appid = 'wx6b85b33678a1dad6';
                let secret = '0597961696fcbfdd07368bbf631c2054';
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                    data: {
                        code: res.code
                    },
                    success: function (res) {
                        console.log(res.data);
                        // console.log(that.globalData.userOpenId);
                        that.globalData.userOpenId = res.data.openid;

                        that.globalData.userToken = res.data.session_key;
                        that.hasUserExist();
                        that.globalData.wechat_user.wechat_open_id = res.data.openid;
                        that.globalData.wechat_user.wechat_token = res.data.session_key;
                        that.globalData.wechat_user.wechat_name = wx.getStorageSync('nickName')
                        that.globalData.wechat_user.wechat_photo = wx.getStorageSync('avatarUrl')
                    }
                })
            }
        });
        // 获取设备信息
        wx.getSystemInfo({
            success: function (res) {
                
                if (res.platform === 'android') {
                    that.globalData.android = true;
                } else {
                    if (res.model === "iPhone X") {
                        that.globalData.iosX = true;
                    } else {
                        that.globalData.iosX = false;
                    }
                }
            }
        })
        /*
                // 获取用户信息
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                                success: res => {
                                    // 可以将 res 发送给后台解码出 unionId
                                    this.globalData.userInfo = res.userInfo
        
                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                    }
                                }
                            })
                        }
                    }
                })
        */
    },
    globalData: {
        userExist: false,
        android: false,
        iosX: false,
        userInfo: null,
        userId: '',
        wechat_user: {
            wechat_name: "",
            wechat_photo: "",
            wechat_open_id: "",
            wechat_token: "",
        },
        userOpenId: '',
        userToken: '',
    }
})