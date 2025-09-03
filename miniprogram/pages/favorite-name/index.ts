import { EventUncollectName } from "../../constants";
import eventBus from "../../utils/event-bus";
import { UserDataMgr } from "../../utils/user-data-mgr";
import { getShareMenuMessage, getShareTimelineMessage } from "../../utils/util";

Page({
  data: {
    nameDataList: [] as INomely.INameCardData[],
  },
  onLoad() {
    this.setData({
      nameDataList: UserDataMgr.favoriateNames.map(item => {
        return { ...item, isFavorite: true }
      }),
    });
  },
  onUncollectFavorite(e: any) {
    const uuid = e.detail?.uuid;
    UserDataMgr.removeFavoriteName(uuid).save();
    const nameDataList = this.data.nameDataList;
    for (let i = 0; i < nameDataList.length; i++) {
      if (nameDataList[i].uuid === uuid) {
        nameDataList.splice(i, 1);
        eventBus.emit(EventUncollectName, uuid);
        this.setData({
          nameDataList,
        });
        break;
      }
    }
  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline() {
    return getShareTimelineMessage();
  },
})
