import { QuestionAndAnswers } from "../../constants";
import { getShareMenuMessage, getShareTimelineMessage } from "../../utils/util";

Page({
  data: {
    // questionAndAnswers: QuestionAndAnswers,
    questionAndAnswers1: QuestionAndAnswers.slice(0, Math.floor(QuestionAndAnswers.length / 2)),
    questionAndAnswers2: QuestionAndAnswers.slice(Math.floor(QuestionAndAnswers.length / 2), QuestionAndAnswers.length),
  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline () {
    return getShareTimelineMessage();
  },
})
