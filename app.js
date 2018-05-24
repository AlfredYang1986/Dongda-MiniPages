//app.js
App({
    userlogin: function () {
        const that = this;
        return new Promise( (resolve, reject) => {
                // console.log('app.js 登陆函数 开始运行');
                wx.showLoading({
                    title: '登录中...',
                });
                wx.login({
                    success: function (res) {
                        let code = res.code
                        wx.request({
                            url: getApp().globalData.httpsAddress + '/login',
                            method: "POST",
                            data: {
                                wx: {
                                    code: code
                                }
                            },
                            success: function (res) {
                                wx.hideLoading();
                                // console.log(res.data);
                                that.globalData.userOpenId = res.data.result.open_id;
                                that.globalData.wechat_user.wechat_open_id = res.data.result.open_id;
                                that.globalData.wechat_user.wechat_name = wx.getStorageSync('nickName');
                                that.globalData.wechat_user.wechat_photo = wx.getStorageSync('avatarUrl');
                                that.globalData.userId = res.data.result.user.user_id;
                                wx.setStorageSync('userId', res.data.result.user.user_id);
                                return resolve('app.js login success');
                            },
                            fail: function (error) {
                                // console.log(error);
                                wx.hideLoading();
                                reject({ error: error });
                                wx.showModal({
                                    title: "网络繁忙",
                                    content: '网络繁忙,请稍后重试',
                                    showCancel: false,
                                })
                            }
                        })
                        /*
                                wx.login({
                                    success: res => {
                                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                                        let code = res.code;
                                        wx.request({
                                            url: getApp().globalData.httpsAddress + '/login',
                                            method: "POST",
                                            data: {
                                                wx: {
                                                    code: res.code
                                                }
                                            },
                                            success: function (res) {
                                                console.log(res.data);
                                                that.globalData.userOpenId = res.data.result.open_id;
                                                that.globalData.wechat_user.wechat_open_id = res.data.result.open_id;
                                                // that.globalData.wechat_user.wechat_token = res.data.session_key;
                                                that.globalData.wechat_user.wechat_name = wx.getStorageSync('nickName');
                                                that.globalData.wechat_user.wechat_photo = wx.getStorageSync('avatarUrl');
                                                that.globalData.userId = res.data.result.user.user_id;
                                                wx.setStorageSync('userId', res.data.result.user.user_id);
                                                // console.log(that.globalData.userOpenId);
                                                // console.log(that.globalData.wechat_user.wechat_open_id);
                                                // console.log(that.globalData.userId);
                                            },
                                            fail: function (error) {
                                                console.log(error);
                                                wx.showModal({
                                                    title: "网络繁忙",
                                                    content: '网络繁忙,请稍后重试',
                                                    showCancel: false,
                                                })
                                            }
                                        })
                                    }
                                });
                        */
                        /*
                            wx.getUserInfo({
                                success: function (res) {
                                    that.globalData.userInfo = res.userInfo;
                                    console.log(that.globalData.userInfo)
                                    wx.request({
                                        url: that.login_url,
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        data: {
                                            code: code,
                                            nickname: res.userInfo.nickName,
                                            gender: res.userInfo.gender,
                                            city: res.userInfo.city,
                                            province: res.userInfo.province,
                                            country: res.userInfo.country,
                                            head: res.userInfo.avatarUrl,
                                        },
                                        method: 'POST',
                                        success(res) {
                                            that.thirdid = res.data.data
                                            wx.setStorageSync('thirdid', res.data.data)
                                            wx.setStorageSync('userInfo', that.globalData.userInfo)
                                            return resolve('app.js login success')
    
                                        }
                                    })
                                },
                                fail: function () {
                                    wx.showToast({
                                        title: '登陆异常',
                                        image: '/image/erro.png'
                                    })
                                    reject('app.js login failed')
                                }
                            })
                        */
                    },
                    fail: function () {
                        wx.showToast({
                            title: '登陆异常',
                            // image: '/image/erro.png'
                        })
                        reject('app.js login failed')
                    },
                })
            }
        )
    },

    onLaunch: function (options) {
        const that = this;
        // console.log("onLaunch");
        console.log(options);
        if(options.scene === 1011) {
            console.log("1011");
        }
        // 登录
        /*
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    let code = res.code;
                    wx.request({
                        url: getApp().globalData.httpsAddress + '/login',
                        method: "POST",
                        data: {
                            wx: {
                                code: res.code
                            }
                        },
                        success: function (res) {
                            console.log(res.data);
                            that.globalData.userOpenId = res.data.result.open_id;
                            that.globalData.wechat_user.wechat_open_id = res.data.result.open_id;
                            // that.globalData.wechat_user.wechat_token = res.data.session_key;
                            that.globalData.wechat_user.wechat_name = wx.getStorageSync('nickName');
                            that.globalData.wechat_user.wechat_photo = wx.getStorageSync('avatarUrl');
                            that.globalData.userId = res.data.result.user.user_id;
                            wx.setStorageSync('userId', res.data.result.user.user_id);
                            // console.log(that.globalData.userOpenId);
                            // console.log(that.globalData.wechat_user.wechat_open_id);
                            // console.log(that.globalData.userId);
                        },
                        fail: function (error) {
                            console.log(error);
                            wx.showModal({
                                title: "网络繁忙",
                                content: '网络繁忙,请稍后重试',
                                showCancel: false,
                            })
                        }
                    })
                }
            });
        */
        // that.userlogin();
        // 获取设备信息
        wx.getSystemInfo({
            success: function (res) {
                if (res.platform === 'android') {
                    that.globalData.android = true;
                } else {
                    if (res.model.slice(0, 8) === "iPhone X") {
                        that.globalData.iosX = true;
                    } else {
                        that.globalData.iosX = false;
                    }
                    // if (res.model === "Nexus 5") {
                    //     that.globalData.android = true;
                    // }
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
        // httpsAddress: 'https://dongdakid.com'
        httpsAddress: 'http://192.168.100.115:9999'
    }
})