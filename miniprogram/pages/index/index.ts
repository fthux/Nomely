
import rand from "./rand";
import books from '../../data/index'
import { NameDescriptions, CommonFamilyNames } from "../../constants";
import { randomInt, removeDuplicateChars, removeNonChineseAndWhitespace } from "../../utils/util";
import { UserDataMgr } from "../../utils/user-data-mgr";
const DefaultExcludedWords = "胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱";
const ShareButtonTexts = [
  "大数据没骗我，这个名字绝了：「$」！",
  "念诗三百首，才勉强选中「$」。",
  "起名不卷了，我家宝宝就叫「$」！",
];
const ShareMenuTexts = [
  "大数据没骗我，这个名字绝了！",
  "念诗三百首，才勉强选中。",
  "起名不卷了，我家宝宝就叫这个了！",
];

Page({
  data: {
    nameDescriptions: NameDescriptions,
    nameDataList: [] as INomely.INameData[],
    familyName: "",
    books,
    chosenBook: books[0],
    commonFamilyNames: CommonFamilyNames,
    isGenerating: false,
    excludedWordsInput: "",
    excludedWordsAll: "",
  },
  onLoad() {
    const excludedWords = UserDataMgr.excludedWords;
    if (!excludedWords) return;
    this.setData({
      excludedWordsAll: excludedWords,
      excludedWordsInput: excludedWords.length >= 10 ? `${excludedWords.slice(0, 10)}...` : excludedWords,
    });
  },
  chooseCommonFamilyName(e: WechatMiniprogram.TouchEvent) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      familyName: dataset.name,
    });
  },
  chooseBook(e: WechatMiniprogram.TouchEvent) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      chosenBook: books.find(item => item.id === dataset.id),
    });
  },
  formatStr(str: string): string {
    let res = str.replace(/(\s|　|”|“){1,}|<br>|<p>|<\/p>/g, '');
    res = res.replace(/\(.+\)/g, '');
    return res;
  },
  splitSentence(content: string): Array<string> {
    if (!content) {
      return [];
    }
    let str = this.formatStr(content);
    str = str.replace(/！|。|？|；/g, (s: string) => `${s}|`);
    str = str.replace(/\|$/g, '');
    let arr = str.split('|');
    arr = arr.filter((item: string) => item.length >= 2);
    return arr;
  },
  // 清除标点符号
  cleanPunctuation(str: string): string {
    const puncReg = /[<>《》！*\(\^\)\$%~!@#…&%￥—\+=、。，？；‘’“”：·`]/g;
    return str.replace(puncReg, '');
  },
  cleanBadChar(str: string): string {
    // const badChars = '胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱'.split('');
    const badChars = this.data.excludedWordsAll.split('');
    return str.split('').filter(char => badChars.indexOf(char) === -1).join('');
  },
  onInputFamilyName(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      familyName: removeNonChineseAndWhitespace(e.detail.value),
    });
  },
  onInputExcludedWords(e: WechatMiniprogram.TouchEvent) {
    const words = removeDuplicateChars(removeNonChineseAndWhitespace(e.detail.value));
    this.setData({
      excludedWordsAll: words,
      excludedWordsInput: words,
    });
  },
  onFocusExcludedWords() {
    this.setData({
      excludedWordsInput: this.data.excludedWordsAll,
    });
  },
  onBlurExcludedWords() {
    this.setData({
      excludedWordsInput: this.data.excludedWordsAll.length >= 10 ? `${this.data.excludedWordsAll.slice(0, 10)}...` : this.data.excludedWordsAll,
    });
    UserDataMgr.setExcludedWords(this.data.excludedWordsAll).save();
  },
  showExcludedWordsTips() {
    wx.showModal({
      title: "常用排除字建议",
      cancelText: "关闭",
      cancelColor: "#666666",
      confirmText: "一键复制",
      confirmColor: "#14B8A6",
      content: `以下是一些在传统姓名学或日常语境中通常会避免使用的汉字，排除它们有助于让名字的寓意更加美好。\n 「${DefaultExcludedWords}」`,
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: DefaultExcludedWords,
            success() {
              wx.showToast({
                title: "排除字复制成功",
                icon: "none",
              })
            },
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    });
  },
  genNames() {
    if (this.data.familyName.trim() === "") {
      wx.showToast({
        title: "请输入您的姓氏",
        icon: "none",
      })
      return;
    }
    this.setData({
      isGenerating: true,
    });
    // wx.showLoading({
    //   title: "生成中...",
    //   mask: true,
    // });
    const timer = setTimeout(() => {
      clearTimeout(timer);
      // wx.hideLoading();
      const nameDataList: INomely.INameData[] = [];
      for (let i = 0; i < 10; i++) {
        const nameData = this.genName(this.data.chosenBook);
        if (!nameData) {
          i--;
          continue;
        }
        nameDataList.push(nameData);
      }
      this.setData({
        isGenerating: false,
        nameDataList: nameDataList,
      });
    }, randomInt(100, 500));
  },
  genName(book: INomely.IBook) {
    const articles = book.articles;
    const article = rand.choose(articles);
    const { content, title, author, dynasty } = article;
    if (!content) {
      return null;
    }
    const sentenceArr = this.splitSentence(content);
    if (!(Array.isArray(sentenceArr) && sentenceArr.length > 0)) {
      return null;
    }
    const sentence = rand.choose(sentenceArr);
    const cleanSentence = this.cleanBadChar(this.cleanPunctuation(sentence));
    if (cleanSentence.length <= 2) {
      return null;
    }
    const name = this.getTwoChar(cleanSentence.split(''));
    const res = {
      name,
      sentence,
      content,
      title,
      author,
      book: book.name,
      dynasty,
    };
    return res;
  },
  getTwoChar(arr: string[]): string {
    const len = arr.length;
    const first = rand.between(0, len);
    let second = rand.between(0, len);
    let cnt = 0;
    while (second === first) {
      second = rand.between(0, len);
      cnt++;
      if (cnt > 100) {
        break;
      }
    }
    return first <= second ? `${arr[first]}${arr[second]}` : `${arr[second]}${arr[first]}`;
  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    if (res.from === "button") {
      return {
        title: ShareButtonTexts[randomInt(0, ShareButtonTexts.length-1)].replace("$",res.target?.dataset?.name),
        path: '/pages/index/index',
      }
    } else {
      return {
        title: ShareMenuTexts[randomInt(0, ShareMenuTexts.length-1)].replace("$",res.target?.dataset?.name),
        path: '/pages/index/index',
      }
    }
  },
});
