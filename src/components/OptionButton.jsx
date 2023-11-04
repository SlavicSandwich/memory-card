import "../css/optionButton.css";
export default function OptionButton({ onClick, children, type = "button" }) {
  return (
    <button onClick={() => onClick?.()} type={type} className="option-button">
      {children}
    </button>
  );
}
