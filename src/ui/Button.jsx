import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "rounded-full bg-yellow-400  text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring  focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-base";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    secondary:
      "rounded-full border-2 border-stone-300 px-4 py-2.5 text-sm font-semibold  uppercase tracking-wide text-stone-400 transition-colors duration-200 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-200 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2  disabled:cursor-not-allowed sm:text-base md:px-6 md:py-3.5",
    small: base + " px-4 py-2 text-xs md:px-5 md:py-2.5",
    round: base + " px-2.5 py-1 text-sm md:px-3.5 md:py-2",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;