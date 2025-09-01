Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    familyName: {
      type: String,
      default: ''
    },
    givenName: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    book: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    dynasty: {
      type: String,
      default: ''
    },
    sentence: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },
  methods: {
    copyName (e: WechatMiniprogram.TouchEvent) {
      const dataset = e.currentTarget.dataset;
      wx.setClipboardData({
        data: dataset.name,
        success () {
          wx.showToast({
            title: "姓名复制成功",
            icon: "none",
          })
        },
      });
    },
  },
})