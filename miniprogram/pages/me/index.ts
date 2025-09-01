Page({
  data: {
  },
  openAboutPage (e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `/pages/qa/index`
    })
  },
})
