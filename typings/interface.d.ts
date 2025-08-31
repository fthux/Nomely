declare namespace INomely {
  interface IArticle {
    content: string | null;
    title: string;
    author: string | null;
    dynasty: string;
  }
  type IBook = { id: string; name: string; description: string; articles: IArticle[] }
  interface IQuestionAndAnswer {
    question: string;
    anwser: string;
  }
}