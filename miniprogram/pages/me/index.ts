import { getShareMenuMessage, getShareTimelineMessage } from "../../utils/util";

Page({
  data: {
  },
  openFavoriteNamePage (e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `/pages/favorite-name/index`
    })
  },
  openAboutPage (e: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: `/pages/qa/index`
    })
  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline () {
    return getShareTimelineMessage();
  },
})
