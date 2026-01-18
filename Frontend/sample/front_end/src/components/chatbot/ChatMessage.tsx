import "../../styles/global.css";

type ChatMessageProps = {
  sender: "user" | "bot";
  text: string;
};

const ChatMessage = ({ sender, text }: ChatMessageProps) => {
  return (
    <div className={`chat-message ${sender}`}>
      {text}
    </div>
  );
};

export default ChatMessage;
