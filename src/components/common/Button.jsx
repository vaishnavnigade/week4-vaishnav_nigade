const Button = ({ children, type = "button", disabled, loading, onClick }) => (
  <button type={type} onClick={onClick} disabled={disabled || loading}>
    {loading ? "Please wait..." : children}
  </button>
);

export default Button;