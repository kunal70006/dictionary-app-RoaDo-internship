import React, { useState } from "react";
import search from "../assets/search.png";

import "../index.css";

const Navbar = ({ setQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="title">
        <h1>Vocab</h1>
      </div>
      <div className="search" onClick={() => setIsOpen(true)}>
        {isOpen ? (
          <input type="text" onChange={(e) => setQuery(e.target.value)} />
        ) : (
          <img src={search} alt="search" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
