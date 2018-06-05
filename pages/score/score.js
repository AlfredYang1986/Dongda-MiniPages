// pages/score/score.js
Page({

    data: {
        android: false,
        iosX: false,
        hasScroll: false,
        hint: false,
        deviceHeight: getApp().globalData.deviceHeight,
        eggtype: "eggs",
        scores: {},
        first: false,
        animateState: 'running',
        hintContent: [
            {
                sign: "conis", title: "如何获得", content: [
                    { title: "咚哒coins", content: "“活动期间，在场地成功打卡将随机出现咚哒币 （星耀场地与最强王者场地咚哒币出现的概率更高哦）”" }
                ]
            },
            { sign: "eggs", title: "如何获得", content: [{ unique: "classic", title: "经典彩蛋", content: "6月1日-6月10日，到达任意一个活动场地，并完成场地活动挑战，扫码打卡成功即可获得一枚‘经典彩蛋’。同一场地多次扫码仅可获得一枚彩蛋。" }, { unique: "surprise", title: "惊喜彩蛋", content: "6月1日-6月10日，玩家在场地打卡随机获得一枚“咚哒币”。咚哒币用于小程序中参与答题。连续答对5题的玩家，即可获得一枚‘惊喜彩蛋’。" }, { unique: "king", title: "王者彩蛋", content: "特定时间内，玩家在最强王者服务方场地完成挑战，扫码打卡成功即可获得一枚‘王者彩蛋’。同一场地多次扫码仅可获得一枚彩蛋。" }] }]
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
     * scroll-view 监听页面滚动
     */
    pageScroll: function (res) {
        var that = this;
        if (res.detail.scrollTop > 0) {
            that.setData({
                hasScroll: true
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
     * 番小茄页面
     */
    fxqPage: function() {
        wx.navigateTo({
            url: '../fxq/fxq',
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
                
                    that.setData({
                        scores: res.data.result.scores,
                        first: !!res.data.result.first
                    });
                    // console.log(res.data.result.first);
                    // console.log(that.data.first);

                    setTimeout(()=> {
                        that.setData({
                            first: false
                        });
                    },3000)
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
            mask: true,
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
        this.setData({
            animateState: 'running',
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        wx.hideLoading();
        this.setData({
            animateState: 'paused',
        })
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