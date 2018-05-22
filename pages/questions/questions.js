// pages/questions/questions.js
Page({

    /**
     * 页面的初始数据
     */
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
        questions: {
            answer: [{
                answer_id: '0001',
                description: "这是问题一的描述，描述，问题一的描述",
                choice: [
                    {
                        index: 0,
                        image: "string",
                        title: "这是问题一的选项一"
                    },
                    {
                        index: 1,
                        image: "string",
                        title: "这是问题一的选项二"
                    },
                    {
                        index: 2,
                        image: "string",
                        title: "这是问题一的选项san"
                    }
                ]
            }, {
                answer_id: '0002',
                description: "这是问题2的描述，描述，问题2的描述",
                choice: [
                    {
                        index: 0,
                        image: "string",
                        title: "这是问题2的选项一"
                    },
                    {
                        index: 1,
                        image: "string",
                        title: "这是问题2的选项二"
                    },
                    {
                        index: 2,
                        image: "string",
                        title: "这是问题2的选项an"
                    }
                ]
            }, {
                answer_id: '0003',
                description: "这是问题three的描述，描述，问题three的描述",
                choice: [
                    {
                        index: 0,
                        image: "string",
                        title: "这是问题three的选项一"
                    },
                    {
                        index: 1,
                        image: "string",
                        title: "这是问题three的选项二"
                    },
                    {
                        index: 2,
                        image: "string",
                        title: "这是问题three的选项an"
                    }
                ]
            }, {
                answer_id: '0004',
                description: "这是问题四的描述，描述，问题四的描述",
                choice: [
                    {
                        index: 0,
                        image: "string",
                        title: "这是问题四的选项一"
                    },
                    {
                        index: 1,
                        image: "string",
                        title: "这是问题四的选项二"
                    },
                    {
                        index: 2,
                        image: "string",
                        title: "这是问题四的选项an"
                    }
                ]
            }, {
                answer_id: '0005',
                description: "这是问题five的描述，描述，问题five的描述",
                choice: [
                    {
                        index: 0,
                        image: "string",
                        title: "这是问题five的选项一"
                    },
                    {
                        index: 1,
                        image: "string",
                        title: "这是问题five的选项二"
                    },
                    {
                        index: 2,
                        image: "string",
                        title: "这是问题five的选项an"
                    }
                ]
            }]
        }
    },
    // 返回
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
                success: function(res) {
                    if(res.confirm) {
                        wx.navigateBack({
                            delta: 1
                        })
                    } else if (res.cancel) {

                    }
                },
                fail: function(res) {},
                complete: function(res) {},
            })
        }
        // wx.navigateBack({
        //     delta: 1
        // })
    },
    // 检测页面滚动
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
        // console.log(res);
    },
    // start
    start: function () {
        this.setData({
            readyStart: true,
        })
    },
    // 获取当前题目
    getQuestionIndex: function () {
        const that = this;
        that.setData({
            index: that.getData.questionsShow.lastIndexOf(true)
        })
    },
    // 答案正确之后需要做的
    rightAnswer: function (e) {
        const that = this;
        wx.hideLoading();
        // console.log(e);
        that.setData({
            clickIndex: e.currentTarget.dataset.index,
            answerColor: 'right_answer',
            rightAnswerCount: ++that.data.rightAnswerCount 
        })
        console.log(that.data.currentQuestion);
        // console.log(that.data.questionsShow);
        let currentQuestion = that.data.currentQuestion + 1;
        console.log(currentQuestion);
        if(currentQuestion===5) {
            setTimeout(()=> {
                that.setData({
                    rightHint: true
                })
            },600)
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
                console.log(that.data.questionsShow)
            }, 2000)
        }

    },
    // 答案错误
    errorAnswer: function (e) {
        const that = this;
        wx.hideLoading();        
        that.setData({
            clickIndex: e.currentTarget.dataset.index,
            answerColor: 'error_answer',
            
        })
        setTimeout(function(){
            that.setData({
                errorHint: true,
            })
        },400)

    },
    // 检测答案
    checkAnswer: function (e) {
        const that = this;
        if (!that.data.hasClick) {
            wx.showLoading({
                title: '提交答案中...',
                mask: true,
            })
            console.log("checkAnswer btn has click");
            let event = e;
            that.setData({
                hasClick: true,
            })
            let index = e.currentTarget.dataset.index;
            let currentQuestion = that.data.currentQuestion;
            // console.log(that.data.questions.answer[currentQuestion].answer_id);
            let answer_id = that.data.questions.answer[currentQuestion].answer_id;
            let data = {
                condition: {
                    wechat_id: getApp().globalData.userOpenId,
                    answers: ["一个列表的你需要验证的answer_id"]
                },
                answers: [
                    {
                        answer_id: answer_id,
                        answer: index
                    }
                ]
            };

            setTimeout(function () {
                // 测试 正确逻辑
                that.rightAnswer(event);
                // 测试 错误逻辑
                // that.errorAnswer(event);
            }, 600);
            /*
                wx.request({
                    method: 'POST',
                    url: getApp().globalData.httpsAddress + '/answer/check',
                    data: data,
                    success: (res) => {
                        console.log(res);
                    
                        if (res.data.answers_check === 1) {
                            // right
                            that.rightAnswer(event);
                           
        
                        } else {
                            // wrong
                            that.wrongAnswer();
                        }
                    },
                    fail: (error) => {
                        wx.showModal({
                            title: '网络繁忙',
                            content: '获取信息失败,请稍后重试',
                            // confirmText: '重新获取',
                            // showCancel: false,
                            success: (res) => {
                                if (res.confirm) {
                                    // that.onLoad();
                                }
                            }
                        })
                    }
                })
        */
        }


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
        //   wx.showLoading({
        //       title: '获取数据中...',
        //   })
        // var open_id = getApp().globalData.userOpenId;
        let data = {
            condition: {
                wechat_id: getApp().globalData.userOpenId
            }
        };
        /*
            wx.request({
                url: getApp().globalData.httpsAddress + '/answer/random',
                data: data,
                method: 'POST',
                success: (res) => {
                    wx.hideLoading();
                    console.log(res.data)
                },
                fail: (error) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '网络繁忙',
                        content: '获取信息失败,请稍后重试',
                        // confirmText: '重新获取',
                        // showCancel: false,
                        success: (res) => {
                            if (res.confirm) {
                                // that.onLoad();
                            }
                        }
                    })
                }
            })
        */
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