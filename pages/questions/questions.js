// pages/questions/questions.js
var timerCountdown;
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
        countDown: 10,
        hiddenCountdown: false,
        questions: {},
        // 倒计时进度条
        num: 100,
        step: null,
        time: null,
        stepTimer: null
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
                content: '咚哒币已消耗，下次进入将耗费一枚新的咚哒币并重新开始答题。',
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
        const that = this;
        // console.log(that.data.questions.answers)
        if (that.data.questions.answers.length > 0) {
            this.setData({
                readyStart: true,
            });
            that.countdown();
            this.circle = this.selectComponent("#circle1");
            this.circle.drawCircleBg('circle_bg', 30, 4);
            // this.circle.drawCircle('circle_draw', 40, 4, 2);
            // 绘制彩色圆环
            this.stepInterval()
        } else {

        }

    },

    /**
     * reset
     */
    reset: function() {
        const that = this;
        clearInterval(timerCountdown);
        that.setData({
            countDown: 10,
            num: 100,
        })
    },
    /**
     * 倒计时
     */
    countdown: function () {
        const that = this;
        // jindutiao
        let countdown = that.data.countDown;
        setTimeout(() => {
            timerCountdown = setInterval(function () {
                countdown--;
                that.setData({
                    countDown: countdown
                })
                if ( countdown == 0 ) {
                    clearInterval(timerCountdown);
                    that.setData({
                        errorHint: true,
                    })
                }
            }, 1000)
        }, 600)
    },
    stepInterval: function () {
        const that = this;
        // 设置倒计时 定时器
        var n = this.data.num / 2
        that.data.stepTimer = setInterval(() => {
            if (this.data.num >= 0) {
                this.data.step = this.data.num / n;
                // 绘制彩色圆环进度条
                this.circle.drawCircle('circle_draw', 30, 4, this.data.step)
                if ((/(^[1-9]\d*$)/.test(this.data.num / 10))) {
                    // 当时间为整数秒的时候 改变时间
                    this.setData({
                        time: this.data.num / 10
                    });
                }
                this.data.num--;
            } else {
                this.setData({
                    time: 0
                });
            }
        }, 100)
    },
    changeTime: function () {
        const that = this;
        // 先清除定时器
        clearInterval(that.data.stepTimer);
        // 计数器 还原到100
        this.setData({
            num: 100
        });
        // 重新开启倒计时
        this.stepInterval()
        // 触发自定义组件事件
        this._runEvent()
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
            rightAnswerCount: ++that.data.rightAnswerCount,
            
        });
        
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
                        rightHint: true,
                        hiddenCountdown: true,
                    })
                },
                fail: (error) => {
                    // console.log(error);
                }
            })
        } else {
            // setTimeout(() => {
            //     that.reset();
            //     that.countdown();
            //     that.stepInterval()
            // }, 1200)
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
                });
                that.reset();
                that.countdown();
                that.stepInterval()
                // console.log(that.data.questionsShow)
            }, 1200)
        }
    },

    /**
     * 答案错误之后需要做的
     */
    errorAnswer: function (e) {
        const that = this;
        clearInterval(timerCountdown);
        clearInterval(that.data.stepTimer);
        wx.hideLoading();
        that.setData({
            clickIndex: e.currentTarget.dataset.index,
            answerColor: 'error_answer',
        })
        setTimeout(function () {
            that.setData({
                errorHint: true,
                hiddenCountdown: true
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

            clearInterval(timerCountdown);
            clearInterval(that.data.stepTimer)
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
        wx.showLoading({
            title: '获取数据中...',
            mask: true,
        });
        const that = this;
        this.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
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
                // console.log(res.data);
                // 
                //   选项重新排列
                //  
                // console.log(res.data);
                let result = res.data.result;
                function shuffle(arr) {
                    let i = arr.length;
                    while (i) {
                        let j = Math.floor(Math.random() * i--);
                        [arr[j], arr[i]] = [arr[i], arr[j]];
                    }
                }
                for (let i = 0,len = result.answers.length; i < len; i++) {
                    let choice = result.answers[i].choice;
                    shuffle(choice);
                }
                that.setData({
                    questions: result,
                });
                
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