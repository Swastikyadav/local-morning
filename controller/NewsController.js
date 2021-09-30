const NewsApi = require("../utils/NewsApi");

class NewsController {
  static async getNews(req, res, next) {
    try {
      const { q } = req.query;

      NewsApi.fetchNews(q)
        .then(response => res.status(200).json(response));
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;