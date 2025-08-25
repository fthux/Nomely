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
    name: "诗经",
    articles: shijing,
  },
  {
    name: "楚辞",
    articles: chuci,
  },
  {
    name: "唐诗",
    articles: tangshi,
  },
  {
    name: "宋词",
    articles: songci,
  },
  {
    name: "乐府诗集",
    articles: yuefu,
  },
  {
    name: "古诗三百首",
    articles: gushi,
  },
  {
    name: "著名辞赋",
    articles: cifu,
  },
];
export default books;