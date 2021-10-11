import "../style/newsCard.css";

function NewsCard({publishedAt, title, url}) {
  return (
    <article className="news-card">
      <small>Technology . 1 hour ago</small>
      <a href={url} target="_blank" rel="noreferrer"><p>{title}</p></a>
      <hr />
    </article>
  );
}

export default NewsCard;