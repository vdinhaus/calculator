type ButtonProps = {
  label: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({ label, onClick, type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="btn btn-blue">
      {label}
    </button>
  );
}
