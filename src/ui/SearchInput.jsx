import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-200 px-4 py-2
        text-sm transition-all duration-300
         placeholder:text-stone-400 focus:w-36 focus:outline-none focus:ring focus:ring-yellow-500
         sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchInput;
