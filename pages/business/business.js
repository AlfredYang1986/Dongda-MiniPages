// pages/business/business.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        android: false,
        iosX: false,
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        services: [{ value: "科学" },
        { value: "艺术" },
        { value: "运动" },
        { value: "看顾" }],
        miniAges: ['', 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        maxAges: ['', 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        miniIndex: 0,
        maxIndex: 0,
        submitData: {
            apply: {
                contact: "",
                contact_no: "",
                brand_name: "",
                service_type: "",
                service_leaf: "",
                input_pwd: "",
                address: "",
                wechat_user: {
                    wechat_name: "",
                    wechat_photo: "",
                    wechat_open_id: "",
                    wechat_token: "",
                },
                age_boundary: {
                    low: "",
                    up: "",
                }
            }
        }
    },
    // 返回
    backBeforePage: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    // 品牌名称
    brandValue: function (e) {
        let submitData = this.data.submitData;

        submitData.apply.brand_name = e.detail.value;

    },
    // 活动地理位置
    locationValue: function (e) {
        let submitData = this.data.submitData;

        submitData.apply.address = e.detail.value;

    },
    // 服务类型
    radioChange: function (e) {
        let submitData = this.data.submitData;
        submitData.apply.service_type = e.detail.value;

        let services = this.data.services;
        for (let i = 0, len = services.length; i < len; i++) {
            if (services[i].value == e.detail.value) {
                services[i].checked = "true"
            } else {
                services[i].checked = ""
            }
        }
        this.setData({
            services: services,
        })
        // console.log(this.data.services);

    },
    // 服务具体分类
    leafValue: function (e) {
        let submitData = this.data.submitData;


        submitData.apply.service_leaf = e.detail.value;

    },
    // 最大与最小年龄
    miniAge: function (e) {
        // console.log('picker发送选择改变，携带值为', this.data.miniAges[e.detail.value]);
        let submitData = this.data.submitData;

        submitData.apply.age_boundary.low = this.data.miniAges[e.detail.value];
        this.setData({
            miniIndex: e.detail.value,
            submitData: submitData,
        })
    },
    maxAge: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        let submitData = this.data.submitData;

        submitData.apply.age_boundary.up = this.data.maxAges[e.detail.value];
        this.setData({
            maxIndex: e.detail.value,
            submitData: submitData,
        })
    },
    // 打卡口令
    pwdValue: function (e) {
        let submitData = this.data.submitData;


        submitData.apply.input_pwd = e.detail.value;

    },
    // 负责人姓名
    nameValue: function (e) {
        let submitData = this.data.submitData;


        submitData.apply.contact = e.detail.value;

    },
    // 手机号码
    noValue: function (e) {
        let submitData = this.data.submitData;

        submitData.apply.contact_no = e.detail.value;

    },
    /*
        formSubmit: function (e) {
            console.log('form发生了submit事件，携带数据为：', e.detail.value);
            let data = e.detail.value;
    
        },
    */
    submitInfo: function () {

        let originData = this.data.submitData;
        let submitData = this.data.submitData.apply;
        // console.log(submitData);
        let blank = 0;
        for (let key in submitData) {
            if (typeof submitData[key] === "object") {
                for (let insidekey in submitData[key]) {
                    if (submitData[key][insidekey] === "") {
                        // wx.showToast({
                        //     title: 'wrong',
                        //     icon: 'loading',
                        //     duration: 1000,
                        // })
                    } else {
                        ++blank;
                    }
                }
            } else {
                // console.log(submitData[key] === "");
                if (submitData[key] === "") {
                    // wx.showToast({
                    //     title: 'wrong',
                    //     icon: 'loading',
                    //     duration: 2000,
                    // })
                } else {
                    ++blank;
                }
            }

        }
        if (blank === 13) {
            // console.log("black == 13");
            wx.showLoading({
                title: '提交中...',
            })
            console.log(originData)
            wx.request({
                url: 'http://192.168.100.115:9000/provider/apply/push',
                method: "POST",
                data: originData,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    wx.hideLoading();
                    console.log(res.data);
                    if (res.data.status === "ok") {
                        wx.navigateTo({
                            url: '../bizsuccess/bizsuccess'
                        })
                    }
                },
                fail: function (error) {
                    console.log(error);
                    wx.showToast({
                        title: '网络异常',
                        icon: 'loading',
                        duration: 1600
                    })
                }
            })
        } else {
            // console.log(blank);
            wx.showModal({
                title: '存在未填项',
                content: '所有项均为必填项',
                showCancel: false,
                confirmText: '继续填写',
                success: function (res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                    }
                }
            })
        }

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(getApp().globalData.userOpenId);
        let submitData = this.data.submitData;
        console.log(submitData)
        submitData.apply.wechat_user = getApp().globalData.wechat_user;
        this.setData({
            submitData: submitData,
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
        });
        // console.log(wx.canIUse('open-data.type.userAvatarUrl'))

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