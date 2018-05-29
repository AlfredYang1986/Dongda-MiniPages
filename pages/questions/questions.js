// pages/questions/questions.js
Page({

    data: {
        canIuseAvatar: wx.canIUse('open-data.type.userAvatarUrl'),
        android: false,
        iosX: false,
        hasScroll: false,
        readyStart: false,// 准备开始
        currentQuestion: 0,     // 当前问题的index
        clickIndex: '',     // 用户选择index
        answerColor: '',//根据选择正确与否给选项添加背景颜色
        hasClick: false,// 是否选择
        rightAnswerCount: 0,    // 用户答对的题目数量
        questionsShow: [true, false, false, false, false],// 用户答题的显示状态
        errorHint: false,
        rightHint: false,
        questions: {},
    },

    /**
     * 返回按钮
     */
    backBeforePage: function (e) {
        // console.log(e.currentTarget.dataset.btn)
        if (e.currentTarget.dataset.btn === "errorbtn") {
            this.setData({
                errorHint: false
            })
            wx.navigateBack({
                delta: 1
            })
        } else if (e.currentTarget.dataset.btn === "rightbtn") {
            this.setData({
                rightHint: false
            })
            wx.navigateBack({
                delta: 1
            })
        } else {
            wx.showModal({
                title: '确认退出？',
                content: '中途退出将重新答题',
                showCancel: true,
                cancelText: '继续答题',
                cancelColor: '#3CC51F',
                confirmText: '依旧退出',
                confirmColor: '#000000',
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateBack({
                            delta: 1
                        })
                    } else if (res.cancel) {

                    }
                },
                fail: function (res) { },
                complete: function (res) { },
            })
        }
    },

    /**
     * 监测页面滚动
     */
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

    /**
     * 点击开始答题
     */
    start: function () {
        this.setData({
            readyStart: true,
        })
    },

    /**
     * 答案正确之后需要做的
     */
    rightAnswer: function (e) {
        const that = this;
        wx.hideLoading();
        // console.log(e);
        that.setData({
            clickIndex: e.currentTarget.dataset.index,
            answerColor: 'right_answer',
            rightAnswerCount: ++that.data.rightAnswerCount
        })
        let currentQuestion = that.data.currentQuestion + 1;
        if (currentQuestion === 5) {
            let data = {
                condition: {
                    wechat_id: getApp().globalData.userOpenId,
                },
                answers_check: 1,
            }
            wx.request({
                method: 'POST',
                url: getApp().globalData.httpsAddress + '/answer/success',
                data: data,
                success: (res) => {
                    // console.log(res.data);
                    that.setData({
                        rightHint: true
                    })
                },
                fail: (error) => {
                    // console.log(error);
                }
            })
        } else {
            setTimeout(function () {
                that.setData({
                    currentQuestion: currentQuestion,
                });
                that.data.questionsShow[currentQuestion] = true;
                that.setData({
                    questionsShow: that.data.questionsShow,
                    clickIndex: "",
                    answerColor: '',
                    hasClick: false,
                })
                // console.log(that.data.questionsShow)
            }, 1200)
        }
    },

    /**
     * 答案错误之后需要做的
     */
    errorAnswer: function (e) {
        const that = this;
        wx.hideLoading();
        that.setData({
            clickIndex: e.currentTarget.dataset.index,
            answerColor: 'error_answer',
        })
        setTimeout(function () {
            that.setData({
                errorHint: true,
            })
        }, 600)
    },

    /**
     * 检查答案正确与否
     */
    checkAnswer: function (e) {
        const that = this;
        // console.log(e);
        if (!that.data.hasClick) {
            wx.showLoading({
                title: '提交答案中...',
                mask: true,
            });
            let event = e;
            that.setData({
                hasClick: true,
            })
            let index = e.currentTarget.dataset.index + 1;
            let currentQuestion = that.data.currentQuestion;
            // console.log(that.data.questions.answer[currentQuestion].answer_id);
            let answer_id = that.data.questions.answers[currentQuestion].answer_id;
            let answers = [];
            answers.push(answer_id);
            let data = {
                condition: {
                    wechat_id: getApp().globalData.userOpenId,
                    answers: answers,
                },
                answers: [
                    {
                        answer_id: answer_id,
                        answer: index
                    }
                ]
            };
            // console.log(data);
            wx.request({
                method: 'POST',
                url: getApp().globalData.httpsAddress + '/answer/check',
                data: data,
                success: (res) => {
                    // console.log(res);
                    if (res.data.result.answers_check === 1) {
                        that.rightAnswer(event);
                    } else {
                        that.errorAnswer(event);
                    }
                },
                fail: (error) => {
                    wx.showModal({
                        title: '网络繁忙',
                        content: '获取信息失败,请稍后重试',
                        showCancel: false,
                        success: (res) => {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }
                        }
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
        });
        wx.showLoading({
            title: '获取数据中...',
            mask: true,
        });
        let data = {
            condition: {
                wechat_id: getApp().globalData.userOpenId
            }
        };

        wx.request({
            url: getApp().globalData.httpsAddress + '/answer/random',
            data: data,
            method: 'POST',
            success: (res) => {
                wx.hideLoading();
                /**
                 * 选项重新排列
                 */
                let result = res.data.result;
                function shuffle(arr) {
                    let i = arr.length;
                    while (i) {
                        let j = Math.floor(Math.random() * i--);
                        [arr[j], arr[i]] = [arr[i], arr[j]];
                    }
                }
                for (let i = 0; i < 5; i++) {
                    shuffle(result.answers[i].choice);
                }

                // console.log(res.data);
                that.setData({
                    questions: result,
                })
            },
            fail: (error) => {
                wx.hideLoading();
                wx.showModal({
                    title: '网络繁忙',
                    content: '获取信息失败,请稍后重试',
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