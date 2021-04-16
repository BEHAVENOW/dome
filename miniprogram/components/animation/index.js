// pyp/animation/animation1/index.js
Component({
  properties: {
    num: { // 球体数量
      type: Number,
      value: 20
    }
  },

  data: {
    topArr: {}, // 顶部定位数值数组
    leftArr: {}, // 左侧定位数值数组
    numArr: [], // 数组循环所需要的值
    animationArr: {}, // 动画名称数组
    borderArr: {}, // 球体直径数组
    num: 20, // 球体数量
    intTimeArr: [] // 定时器名称数组
  },

  attached: function () {
    // 渲染球体数量、球体直径、球体初始位置等基础参数
    var num = this.data.num <= 20 ? this.data.num : 20
    var numArr = this.data.numArr

    for (var i = 1; i <= num; i++) {
      var topArr = this.data.topArr
      var leftArr = this.data.leftArr
      var borderArr = this.data.borderArr

      const si = wx.getSystemInfoSync()
      var w = si.windowWidth
      var h = si.windowHeight

      var top = Math.round(Math.random() * h * 1.8)
      var left = Math.round(Math.random() * w * 1.8)
      var border = Math.round(Math.random() * 150)

      topArr["top" + i] = top
      leftArr["left" + i] = left
      borderArr["border" + i] = border
      numArr.push(i)

      this.setData({
        topArr: topArr,
        leftArr: leftArr,
        w: w,
        h: h,
        borderArr: borderArr,
        numArr:numArr
      })
    }
  },


  ready: async function (options) {
    // 渲染动画效果
    var num = this.data.num <= 20 ? this.data.num : 20
    for (var i = 1; i <= num; i++) {
      await this.setInter(i)
    }
  },

  detached: function () {
    // 离开页面时销毁定时信息
    var intTimeArr = this.data.intTimeArr
    intTimeArr.forEach(v => clearInterval(v))
  },


  methods: {

    async setInter(i) {
      var animationData = "animationData" + i // 动画名称
      var time = 1000 + i * 100 // 动画与动画之间的间隔

      // 创建动画
      this.animation = wx.createAnimation({
        duration: time,
        timingFunction: 'linear'
      })

      var next = "true"
      var intTimeArr = this.data.intTimeArr

      // 创建定时动画
      intTimeArr.push(setInterval(function () {
        if (next) {
          var x = Math.round(Math.random() * 3) // 随机球体半径
          this.animation.scale(x, x).opacity(0).step() // 动画效果
          next = !next
        } else {
          this.animation.scale(0, 0).opacity(0.9).step()
          next = !next
        }

        var animationArr = this.data.animationArr // 存储动画名称
        animationArr[animationData] = this.animation.export() // 动画刷新

        var topArr = this.data.topArr
        var leftArr = this.data.leftArr
        topArr['top' + i] = Math.round(Math.random() * this.data.h * 1.8) // 随机下一次动画位置
        leftArr['left' + i] = Math.round(Math.random() * this.data.w * 1.8) // 随机下一次动画位置

        this.setData({
          animationArr: animationArr,
          topArr: topArr,
          leftArr: leftArr
        })
      }.bind(this), time))

      this.setData({
        intTimeArr: intTimeArr
      })
    }

  }
})
