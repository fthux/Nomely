export interface IArticle {
  content: string | null;
  title: string;
  author: string | null;
  dynasty: string;
};
export type IBook = { id: string; name: string; description: string; articles: IArticle[] };