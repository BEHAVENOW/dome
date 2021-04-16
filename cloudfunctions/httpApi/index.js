// 云函数入口文件
const cloud = require('wx-server-sdk')
const resulr
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  wx.request({
    url: event.url,
    method: 'POST',
    data: {
      params: event.params,
      version: '1.0', 
      id: '12', 
      request: {'apiVer':'1.0.0'}
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
     return res
    }      
  })
}
