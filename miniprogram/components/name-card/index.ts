Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    uuid: {
      type: String,
      default: ''
    },
    isFavorite: {
      type: Boolean,
      default: true
    },
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
    // content: {
    //   type: String,
    //   default: ''
    // },
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
    showBorder: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    collectName(e: WechatMiniprogram.TouchEvent) {
      this.triggerEvent("collect", {
        uuid: this.properties.uuid,
      });
    },
    uncollectName(e: WechatMiniprogram.TouchEvent) {
      this.triggerEvent("uncollect", { uuid: this.properties.uuid, });
    },
    copyName(e: WechatMiniprogram.TouchEvent) {
      const dataset = e.currentTarget.dataset;
      wx.setClipboardData({
        data: dataset.name,
        success() {
          wx.showToast({
            title: "姓名复制成功",
            icon: "none",
          });
        },
      });
    },
  },
})