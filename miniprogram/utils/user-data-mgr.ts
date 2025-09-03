const UserDataSaveKey = "user-data";
class UserData implements INomely.IUserData {
  excludedWords = "";
  favoriteNames: INomely.INameCardData[] = [];
}
export class UserDataMgr {
  private static TAG = "UserDataMgr";
  private static data: UserData;
  public static get excludedWords() {
    return this.data.excludedWords;
  }
  public static get favoriateNames() {
    return this.data.favoriteNames;
  }
  public static init() {
    const storageData = wx.getStorageSync(UserDataSaveKey);
    if (storageData === undefined || storageData === null || storageData === "") {
      this.data = new UserData();
    } else {
      this.data = JSON.parse(storageData);
    }
  }
  public static setExcludedWords(words: string): typeof UserDataMgr {
    this.data.excludedWords = words;
    return this;
  }
  public static addFavoriteName(nameData: INomely.INameCardData): typeof UserDataMgr {
    if (!nameData) return this;
    if (this.data.favoriteNames.find(item => item.uuid === nameData.uuid)) {
      console.warn(`${this.TAG} addFavoriteName 已经存在 uuid 是 ${nameData.uuid} 的数据`);
    } else {
      this.data.favoriteNames.push(nameData);
    }
    return this;
  }
  public static removeFavoriteName(uuid: string): typeof UserDataMgr {
    if (!uuid) return this;
    for (let i = 0; i < this.data.favoriteNames.length; i++) {
      if (this.data.favoriteNames[i].uuid === uuid) {
        this.data.favoriteNames.splice(i, 1);
        break;
      }
    }
    return this;
  }
  public static save() {
    wx.setStorageSync(UserDataSaveKey, JSON.stringify(this.data));
  }
}