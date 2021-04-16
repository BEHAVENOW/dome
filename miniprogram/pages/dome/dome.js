const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageUrl0: '//img01.yun300.cn/repository/image/54YV40KdSdm5xP-QPSbO_A.jpg?tenantId=163852&viewType=1&k=1607696680000',
    imageUrl1: '../../images/data.png',
    imageUrl2: '../../images/alarm1.png',
    imageUrl3: '../../images/details2.png',
    imageUrl4: '../../images/control1.png',
    imgUrls: [
      {
      link: '',
      url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3346194237,289385619&fm=26&gp=0.jpg'
      },
      {
      link: '',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1258116348,1037408241&fm=26&gp=0.jpg'
      },
      {
      link: '',
      url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2033921778,648007645&fm=26&gp=0.jpg'
      }
      ],
      indicatorDots: true, // 是否显示面板指示点
      autoplay: true, //是否自动切换
      circular: true, //是否采用衔接滑动
      vertical: false, //滑动方向是否为纵向
      interval: 3000, //自动切换时间间隔
      duration: 100, //滑动动画时长
      userId: '',
      uuid: ''
  },
  onLoad: function (options) {
    var uuid = options.key
    this.setData({
      uuid: uuid
    })
  },
  monitorGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/data/data?key='+key,
    })
  },
  alarmGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/alarm/alarm?key='+key,
    })
  },
  detailsGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/details/details?key='+key,
    })
  },
  controlGo: function (e) {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/control1/control1?key='+key,
    })
  },
  settingGo: function () {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/?key='+key,
    })
  },
  spot: function () {
    var key = this.data.uuid
    wx.navigateTo({
      url: '/pages/controlSZ/controlSZ?key='+key,
    })
  },
})