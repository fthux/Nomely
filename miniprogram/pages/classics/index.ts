import books from "../../data/index";

Component({
  data: {
    books,
  },
  methods: {
    chooseBook (e: WechatMiniprogram.TouchEvent) {
      const dataset = e.currentTarget.dataset;
      wx.navigateTo({
        url: `pages/book-detail/index?book-id=${dataset.bookId}`
      })
    },
  },
})
