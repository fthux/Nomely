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
    answer: string;
  }
  interface IUserData {
    excludedWords: string;
  }
  interface INameData {
    name: string,
    sentence: string,
    content: string,
    title: string,
    author: string,
    book: string,
    dynasty: string,
  }
}