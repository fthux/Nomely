Component({
  properties: {
    id: {
      type: String,
      default: ''
    },
    article: {
      type: Object,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    dynasty: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
  },
  data: {
    isContentExtra: false, // 内容是否已超默认高度
    canReadMore: false,
    contentHeightMax: 0,
    contentHeight: 'auto',
  },
  lifetimes: {
    ready: function() {
      wx.nextTick(() => {
        const query = wx.createSelectorQuery().in(this);
        query.select("#content").boundingClientRect();
        query.exec((res) => {
          const contentHeight = res[0].height || 0;
          const contentHeightMax = contentHeight;
          const isContentExtra = contentHeight > 88;
          const canReadMore = isContentExtra;
          this.setData({
            contentHeightMax,
            isContentExtra,
          });

          if (isContentExtra) {
            if (canReadMore) {
              this.closeMore();
            } else {
              this.openMore();
            }
          }
        });
      });
    },
  },
  methods: {
    openMore () {
      this.setData({
        contentHeight: this.data.contentHeightMax + "px",
        canReadMore: false,
      });
    },
    closeMore () {
      this.setData({
        contentHeight: 88 + "px",
        canReadMore: true,
      });
    },
  },
});