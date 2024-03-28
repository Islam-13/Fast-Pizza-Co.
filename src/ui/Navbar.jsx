import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import UserName from "./UserName";

function Navbar() {
  return (
    <nav className=" border-b border-stone-300 bg-yellow-400 px-4 py-3 uppercase">
      <div className="m-auto flex items-center justify-between md:max-w-[80%]">
        <Link to="/" className="tracking-widest">
          fast pizza co.
        </Link>

        <SearchInput />

        <UserName />
      </div>
    </nav>
  );
}

export default Navbar;
