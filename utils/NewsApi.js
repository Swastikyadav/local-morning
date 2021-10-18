const NewsApi = require("newsapi");
const newsApi = new NewsApi(process.env.newsApiKey);

class NewsApiClass {
  static fetchNews(q) {
    return newsApi.v2.everything({q});
  }

  static fetchTopHeadlines() {
    return newsApi.v2.topHeadlines({language: "en"});
  }
}

module.exports = NewsApiClass;