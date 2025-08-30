/// <reference path="./types/index.d.ts" />
/// <reference path="./types/index.d.ts" />
/// <reference path="./interface.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}