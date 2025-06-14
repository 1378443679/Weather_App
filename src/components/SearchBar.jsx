// SearchBar.jsx
import { useState } from "react";

let initialValues = {
  city: ''
};

const SearchBar = ({ onSearch }) => {
  const [quote, setQuote] = useState(initialValues);

  const onChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (quote.city.trim() !== "") {
      onSearch(quote.city);
    }
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Enter City, Country" 
        id="cityinput"
        value={quote.city}
        name="city"
        onChange={onChange} 
      />
      <button 
        onClick={handleSubmit} 
        style={{ marginLeft: "50px", padding: "8px 16px" }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
