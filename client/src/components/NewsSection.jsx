import { useState, useEffect, useRef } from "react";

import NewsCard from "./NewsCard";
import API from "../utils/API";

function NewsSection() {
  const searchInputEl = useRef(null);

  const [query, setQuery] = useState("");
  const [newsArray, setNews] = useState([]);

  useEffect(() => {
    if(query) {
      API.getNews(query)
        .then(res => {
          setNews(res.articles);
        })
    } else {
      API.getTopHeadlines()
        .then(res => {
          setNews(res.articles);
        })
    }

    return () => {setNews([])}
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    
    setQuery(searchInputEl.current.value);
  }
  
  return (
    <aside className="news-section">
      <h2 className="heading">Local Morning News</h2>

      <form onSubmit={handleSearch}> 
        <input
          ref={searchInputEl}
          className="search-input input-focus"
          type="search"
          placeholder="Search News Here..."
        />
        <input className="search-btn" type="submit" value="Search" />
      </form>

      {
        newsArray.map((news, idx) => {
          return (
            <NewsCard
              key={idx}
              publishedAt={news.publishedAt}
              title={news.title}
              url={news.url}
            />
          )
        })
      }
    </aside>
  );
}

export default NewsSection;