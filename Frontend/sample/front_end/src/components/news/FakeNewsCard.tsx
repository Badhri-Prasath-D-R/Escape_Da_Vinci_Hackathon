import EvidenceBox from "./EvidenceBox";
import "../../styles/global.css";

type FakeNewsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  platform: string;
  evidence: string;
  sources?: string[];
};

const FakeNewsCard = ({
  title,
  description,
  imageUrl,
  sourceUrl,
  platform,
  evidence,
  sources = [],
}: FakeNewsCardProps) => {
  return (
    <div className="news-card fake">
      <img src={imageUrl} alt="Fake news visual" />

      <div className="news-content">
        <span className="badge fake">FAKE</span>

        <h3>{title}</h3>
        <p className="description">{description}</p>

        <p className="meta">
          <strong>Platform:</strong> {platform}
        </p>

        <EvidenceBox
          title="Why is this Fake?"
          evidence={evidence}
          sources={sources}
        />

        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          🔗 View Original Source
        </a>
      </div>
    </div>
  );
};

export default FakeNewsCard;
