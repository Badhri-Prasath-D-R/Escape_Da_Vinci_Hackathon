import "../../styles/global.css";

type EvidenceBoxProps = {
  title?: string;
  evidence: string;
  sources?: string[];
};

const EvidenceBox = ({
  title = "Evidence & Verification",
  evidence,
  sources = [],
}: EvidenceBoxProps) => {
  return (
    <div className="evidence-box">
      <h4 className="evidence-title">{title}</h4>
      <p className="evidence-text">{evidence}</p>

      {sources.length > 0 && (
        <div className="evidence-sources">
          <strong>Trusted Sources:</strong>
          <ul>
            {sources.map((src, index) => (
              <li key={index}>{src}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EvidenceBox;
