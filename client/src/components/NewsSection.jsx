import NewsCard from "./NewsCard";

function NewsSection() {
  return (
    <aside className="news-section">
      <h2 className="heading">Local Morning News</h2>

      <form > 
        <input className="search-input input-focus" type="search" placeholder="Search News Here..." />
        <input className="search-btn" type="submit" value="Search" />
      </form>

      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </aside>
  );
}

export default NewsSection;