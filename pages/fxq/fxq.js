// pages/fxq/fxq.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        android: false,
        iosX: false,
        hasScroll: false,
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
     * 保存图片
     */
    saveImage: function (e) {
        // console.log(e.currentTarget.dataset);
        let img = e.currentTarget.dataset.whichimg;
        wx.showActionSheet({
            itemList: ['保存图片'],
            success: function (res) {
                // console.log(res.tapIndex);
                if (res.tapIndex === 0) {
                    wx.getSetting({
                        success: (res) => {
                            // console.log(res);
                            if (res.authSetting['scope.writePhotosAlbum'] === false) {
                                wx.showModal({
                                    title: '没有权限',
                                    content: '请在设置中打开‘保存到相册’权限',
                                    success: (res) => {
                                        if (res.confirm) {
                                            wx.openSetting({
                                                success: (res) => {
                                                    console.log(res);
                                                }
                                            })
                                        } else {
                                            wx.showToast({
                                                title: '保存失败',
                                                icon: 'loading',
                                                duration: 1800,
                                                mask: true,
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.saveImageToPhotosAlbum({
                                    filePath: '/utils/images/'+img+'@2x.png',
                                    success: (res) => {
                                        // console.log(res)
                                        wx.showToast({
                                            title: '保存成功',
                                            icon: 'success',
                                            duration: 1600,
                                            mask: true,
                                        })
                                    },
                                    fail: (error) => {
                                        console.log(error)
                                    }
                                })
                            }

                        }
                    })
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        that.setData({
            android: getApp().globalData.android,
            iosX: getApp().globalData.iosX,
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