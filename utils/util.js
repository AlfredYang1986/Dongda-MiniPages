const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 覆写 wx.request
function request(url,data) {
    return new Promise(function(resolve,reject) {
        wx.request({
            url: getApp().globalData.httpsAddress + url,
            data: data,
            method: 'POST',
            success: function(res) {
                if(res.statusCode!== 200) {
                    reject({error:'服务器忙,请稍后重试',code:500});
                    return;
                }
                resolve(res.data)
            },
            fail: function(error) {
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
            },
            complete: function(res) {},
        })
    })
}

// 防止多次点击
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null

    // 返回新的函数
    return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}
module.exports = {
  formatTime: formatTime,
  throttle: throttle
}
