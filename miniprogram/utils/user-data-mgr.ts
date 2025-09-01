const UserDataSaveKey = "user-data";
class UserData implements INomely.IUserData {
  excludedWords = "";
}
export class UserDataMgr {
  private static data: UserData;
  public static get excludedWords() {
    return this.data.excludedWords;
  }
  public static init () {
    const storageData = wx.getStorageSync(UserDataSaveKey);
    if (storageData === undefined || storageData === null || storageData === "") {
      this.data = new UserData();
    } else {
      this.data = JSON.parse(storageData);
    }
  }
  public static setExcludedWords (words: string): typeof UserDataMgr {
    this.data.excludedWords = words;
    return this;
  }
  public static save () {
    wx.setStorageSync(UserDataSaveKey, JSON.stringify(this.data));
  }
}