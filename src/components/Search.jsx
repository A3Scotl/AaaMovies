import React from "react";

function Search() {
  return (
    <div className="input-group d-flex custom-search-form">
      <div className="form-outline" >
        <input placeholder="Search" type="search" className="form-control" />
        
      </div>
      <button type="button" className="btn" >
      <i className="bi bi-search text-white"></i>
      </button>
    </div>
  );
}

export default Search;
