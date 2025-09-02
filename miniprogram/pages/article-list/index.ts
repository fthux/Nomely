import books from "../../data/index";
import { getShareMenuMessage, getShareTimelineMessage, randomInt } from "../../utils/util";

Page({
  data: {
    navigationBarTitle: "",
    isFetchingMore: false,
    pageSize: 10,
    currentArticleIndex: 0,
    rawArticles: [] as INomely.IArticle[],
    articles: [] as INomely.IArticle[],
  },
  onLoad(query: Record<string, string | undefined>) {
    const bookId = query.id;
    const book = books.find(item => item.id === bookId);
    if (!book) return;
    this.setData({
      navigationBarTitle: book?.name,
      rawArticles: book?.articles || [],
    });
    this.fetchMoreArticles();
  },
  fetchMoreArticles () {
    if (this.data.isFetchingMore || this.data.currentArticleIndex + 1 >= this.data.rawArticles.length) {
      return;
    }
    this.setData({
      isFetchingMore: true,
    });
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (this.data.currentArticleIndex + this.data.pageSize >= this.data.rawArticles.length) {
        const currentArticleIndex = this.data.rawArticles.length - 1;
        this.setData({
          isFetchingMore: false,
          currentArticleIndex,
          articles: this.data.rawArticles.slice(0, currentArticleIndex),
        });
      } else {
        const currentArticleIndex = this.data.currentArticleIndex + this.data.pageSize;
        this.setData({
          isFetchingMore: false,
          currentArticleIndex,
          articles: this.data.rawArticles.slice(0, currentArticleIndex),
        });
      }
    }, randomInt(100, 500));
  },
  onReachBottom () {
    this.fetchMoreArticles();
  },
  onShareAppMessage(res: WechatMiniprogram.Page.IShareAppMessageOption) {
    return getShareMenuMessage(res);
  },
  onShareTimeline () {
    return getShareTimelineMessage();
  },
});
