import "../../styles/global.css";

type LoaderProps = {
  text?: string;
};

const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
