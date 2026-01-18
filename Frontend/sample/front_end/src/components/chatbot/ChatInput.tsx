import "../../styles/global.css";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

const ChatInput = ({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      onSend();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Paste news text or URL here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button onClick={onSend} disabled={disabled}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
