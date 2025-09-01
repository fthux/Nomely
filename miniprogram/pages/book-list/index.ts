import books from "../../data/index";

Page({
  data: {
    books,
  },
  chooseBook(e: WechatMiniprogram.TouchEvent) {
    const dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/article-list/index?id=${dataset.bookid}`
    })
  },
})
