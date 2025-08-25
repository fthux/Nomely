import { IArticle } from "../../../interface";
import rand from "./rand";
import shijing from '../../data/shijing'

interface INameData {
  name: string,
  sentence: string,
  content: string,
  title: string,
  author: string,
  book: string,
  dynasty: string,
}

Component({
  lifetimes: {
    attached() {
      const nameDataList: INameData[] = [];
      for (let i = 0; i < 10; i++) {
        const nameData = this.genName("诗经", shijing);
        if (!nameData) {
          i--;
          continue;
        }
        nameDataList.push(nameData);
      }
      this.setData({
        nameDataList: nameDataList
      });
    },
  },
  data: {
    nameDataList: [] as INameData[],
  },
  methods: {
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
      const badChars = '胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱'.split('');
      return str.split('').filter(char => badChars.indexOf(char) === -1).join('');
    },
    genName(book: string, articles: IArticle[]) {
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
        book,
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

  },

})
