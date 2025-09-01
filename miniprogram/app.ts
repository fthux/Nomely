import { UserDataMgr } from "./utils/user-data-mgr"

App<IAppOption>({
  globalData: {},
  onLaunch() {
    UserDataMgr.init();
  },
})