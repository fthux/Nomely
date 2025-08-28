import { IBook } from '../../interface';
import chuci from './chuci';
import cifu from './cifu';
import gushi from './gushi';
import shijing from './shijing';
import songci from './songci';
import tangshi from './tangshi';
import yuefu from './yuefu';

const books: IBook[] = [
  {
    id: "shijing",
    name: "诗经",
    description: "中国最早的诗歌总集，内容风雅，文字质朴。",
    articles: shijing,
  },
  {
    id: "chuci",
    name: "楚辞",
    description: "屈原的浪漫主义诗篇，辞藻华美，想象奇绝。",
    articles: chuci,
  },
  {
    id: "tangshi",
    name: "唐诗",
    description: "格律严谨，意境深远，中华诗歌的巅峰之作。",
    articles: tangshi,
  },
  {
    id: "songci",
    name: "宋词",
    description: "长短句式，婉约豪放，极具音乐美感。",
    articles: songci,
  },
  {
    id: "yuefu",
    name: "乐府诗集",
    description: "源自民间，叙事性强，反映社会生活。",
    articles: yuefu,
  },
  {
    id: "gushi",
    name: "古诗三百首",
    description: "精选历代经典古诗，篇幅适中，易于诵读。",
    articles: gushi,
  },
  {
    id: "cifu",
    name: "著名辞赋",
    description: "句式灵活，文采华丽，兼具诗歌与散文之美。",
    articles: cifu,
  },
];
export default books;