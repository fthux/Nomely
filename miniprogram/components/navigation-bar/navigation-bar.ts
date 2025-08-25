Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: Boolean,
      default: false
    },
    isBack: {
      type: Boolean,
      default: false
    },
    isAvatar: {
      type: Boolean,
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  data: {
    StatusBar: 0,
    CustomBar: 0,
    Custom: {}
  },
  lifetimes: {
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            StatusBar: res.statusBarHeight,
            Custom: rect,
            CustomBar: rect.bottom + rect.top - res.statusBarHeight,
          })
        }
      })
    },
  },
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/home/home',
      });
      // wx.switchTab({
      //   url: '/pages/home/home',
      // });
    },
  }
});
