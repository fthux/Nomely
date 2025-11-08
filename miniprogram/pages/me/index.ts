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
  copyGithub (e: WechatMiniprogram.TouchEvent) {
    wx.setClipboardData({
      data: "https://github.com/fthux/nomely",
      success() {
        wx.showToast({
          title: "仓库地址复制成功",
          icon: "none",
        });
      },
    });
  },
  copyWechat (e: WechatMiniprogram.TouchEvent) {
    wx.setClipboardData({
      data: "d3hpZF96NWhyamFqdDFhOGwyMQ==",
      success() {
        wx.showToast({
          title: "联系方式复制成功",
          icon: "none",
        });
      },
    });
  },
  onShareTimeline () {
    return getShareTimelineMessage();
  },
})
