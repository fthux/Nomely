import books from "../../data/index";
import { getShareMenuMessage, getShareTimelineMessage } from "../../utils/util";

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
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline () {
    return getShareTimelineMessage();
  },
})
