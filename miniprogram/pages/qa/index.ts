import { QuestionAndAnswers } from "../../constants";
import { getShareMenuMessage, getShareTimelineMessage } from "../../utils/util";

Page({
  data: {
    questionAndAnswers: QuestionAndAnswers,
  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline () {
    return getShareTimelineMessage();
  },
})
