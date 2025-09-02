import { getShareMenuMessage, getShareTimelineMessage } from "../../utils/util";

Page({
  data: {
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
