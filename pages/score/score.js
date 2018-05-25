// pages/score/score.js
Page({

    data: {
        android: false,
        iosX: false,
        hasScroll: false,
        hint: false,
        eggtype: "eggs",
        scores: {},
        hintContent: [
            {
                sign: "conis", title: "如何获得", content: [
                    { title: "咚哒coins", content: "活动期间，在场地打开即可获得经典彩蛋活动期间，在场地打开即可获得经典彩蛋" }
                ]
            },
            { sign: "eggs", title: "如何获得", content: [{ unique: "classic", title: "经典彩蛋", content: "经典彩蛋一共四种类型，分别是科学蛋、艺术蛋、运动蛋和体验蛋。6月2日-10日，到达任意一家品牌机构签到扫码，均可获得一个经典彩蛋。" }, { unique: "surprise", title: "惊喜彩蛋", content: "6月4日-6月8日五天中，用户在星耀挑战场地进行打卡，将获得一个“惊喜彩蛋”。" }, { unique: "king", title: "王者彩蛋", content: "王者彩蛋一共四种类型，分别是科学王者、艺术王者、运动王者和体验王者。四天周末（6月2日、6月3日、6月9日、6月10日），用户在最强王者服务方场地打卡，并完成场地挑战，即可获得一个“王者彩蛋”。" }] }]
    },

    /**
     * 返回
     */
    backBeforePage: function () {
        wx.navigateBack({
            delta: 1
        })
    },

    /**
     * 检测页面滚动
     */
    onPageScroll: function (res) {
        var that = this;
        if (res.scrollTop > 0) {
            that.setData({
                hasScroll: true,
            })
        } else {
            that.setData({
                hasScroll: false
            })
        }
    },

    /**
     * 显示提示
     */
    showHint: function (e) {
        const that = this;
        this.setData({
            eggtype: e.currentTarget.dataset.type,
            hint: true
        })
    },

    /**
     * 关闭提示
     */
    closeHint: function () {
        this.setData({
            hint: false
        })
    },

    /**
     * 答题界面
     */
    score: function (e) {
        const that = this;
        let coins = that.data.scores.scores_B;
        if (coins > 0) {
            wx.showLoading({
                title: '加载资源中...',
                mask: true,
            });
            wx.navigateTo({
                url: '../questions/questions',
            })
        } else {
            this.setData({
                eggtype: e.currentTarget.dataset.type,
                hint: true
            })
        }
    },

    /**
     * 获取score data
     */
    getScores: function () {
        const that = this;
        let data = {
            condition: {
                wechat_id: getApp().globalData.userOpenId
            }
        };
        wx.request({
            url: getApp().globalData.httpsAddress + '/scores/query',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                console.log(res.data.result);
                if (res.data.result.scores === "not exist") {

                } else {
                    that.setData({
                        scores: res.data.result.scores
                    });
                }
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败,请稍后重试',
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 1
                            })
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
        var that = this;
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
        });
        wx.showLoading({
            title: '获取数据中...',
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
        const that = this;
        // let data = {
        //     condition: {
        //         wechat_id: getApp().globalData.userOpenId
        //     }
        // };
        if (getApp().globalData.userOpenId === "") {
            // console.log();
            getApp().userlogin()
                .then(() => {
                    that.getScores();
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            that.getScores();
        }
        // that.getScores(data);
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
    // onPullDownRefresh: function () {

    // },

    /**
     * 页面上拉触底事件的处理函数
     */
    // onReachBottom: function () {

    // },

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