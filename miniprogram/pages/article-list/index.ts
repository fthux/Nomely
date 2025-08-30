import articles from "../../data/chuci";
import books from "../../data/index";

Page({
  onLoad(query: Record<string, string | undefined>) {
    const bookId = query.id;
    const book = books.find(item => item.id === bookId);
    if (!book) return;
    this.setData({
      navigationBarTitle: book?.name,
      articles: book?.articles || [],
    });
  },
  data: {
    navigationBarTitle: "",
    articles: [] as INomely.IArticle[]
  },
});
