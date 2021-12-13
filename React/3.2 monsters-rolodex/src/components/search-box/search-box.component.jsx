import React from "react";

import "./search-box.styles.css";

// handleChange => onSearchChange
export const SearchBox = ({ placeholder, handleChange }) => (
  <input
    className="search"
    type="search"
    // placeholder="Search Monster"
    placeholder={placeholder}
    // onChange={(e) => this.setState({ searchField: e.target.value })}
    onChange={handleChange}
  />
);
