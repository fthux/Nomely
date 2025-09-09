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
  onAddMarkFavorite(e: any) {
    const uuid = e.detail?.uuid;
    const index = this.data.nameDataList.findIndex(item => item.uuid === uuid);
    if (index === -1) return;
    const itemData = this.data.nameDataList[index];
    const that = this;
    wx.showModal({
      title: `为“${itemData.familyName}${itemData.givenName}”添加备注`,
      cancelText: "取消",
      cancelColor: "#666666",
      confirmText: "保存",
      confirmColor: "#14B8A6",
      content: itemData.mark || "",
      editable: true,
      placeholderText: "所思所想...",
      success(res) {
        if (res.confirm) {
          const mark = res.content;
          itemData.mark = mark;
          that.setData({
            [`nameDataList[${index}]`]: itemData,
          });
          UserDataMgr.updateFavoriteNameMark(uuid, mark).save();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    });

  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline() {
    return getShareTimelineMessage();
  },
})
