export interface IArticle {
  content: string | null;
  title: string;
  author: string | null;
  dynasty: string;
};
export type IBook = { name: string; articles: IArticle[] };