const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const uuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
 
  var uuid = s.join("");
  return uuid
}

const requirt = function (url, login, ) {
  wx.request({
    url: 'http://4e0509eff3274a129547767f27551e6d-cn-shanghai.alicloudapi.com/a123tZ4YzkPy1w8O/bfBPzul3KqVhP8', //仅为示例，并非真实的接口地址
    method: 'POST',
    data: {
      'params': {
        action: 'login',
        userName: this.data.username,
        userPassword: this.data.password,
        create_ts: timestamp,
        page: '/pages/sgin/sgin'
        
      },
      // Date.parse(new Date())/1000
      'version': '1.0', 
      'id': uuid, 
      'request': {'apiVer':'1.0.0'}
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
  })
}

module.exports = {
  formatTime,
  uuid
}


