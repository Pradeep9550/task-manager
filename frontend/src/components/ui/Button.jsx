const Button = ({ children, loading, className = "", ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`w-full rounded-lg bg-black text-white py-3 font-medium transition hover:opacity-90 disabled:opacity-50 ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
