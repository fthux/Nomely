Component({
  data: {
  },
  methods: {
    openAboutPage (e: WechatMiniprogram.TouchEvent) {
      wx.navigateTo({
        url: `/pages/qa/index`
      })
    },
  },
})
