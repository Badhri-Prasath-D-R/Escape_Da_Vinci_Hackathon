import "../../styles/global.css";

type RealNewsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  category: string;
};

const RealNewsCard = ({
  title,
  description,
  imageUrl,
  sourceUrl,
  sourceName,
  category,
}: RealNewsCardProps) => {
  return (
    <div className="news-card real">
      <img src={imageUrl} alt="Verified news visual" />

      <div className="news-content">
        <span className="badge real">VERIFIED</span>

        <h3>{title}</h3>
        <p className="description">{description}</p>

        <p className="meta">
          <strong>Source:</strong> {sourceName}
        </p>

        <p className="meta">
          <strong>Category:</strong> {category}
        </p>

        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          🔗 Read Official Source
        </a>
      </div>
    </div>
  );
};

export default RealNewsCard;
