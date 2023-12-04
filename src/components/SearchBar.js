import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import "./SearchBar.css";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };
  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        window.location.href = searchData[selectedItem].show.url;
        console.log(searchData[selectedItem].show.url);
      }
    } else {
      setSelectedItem(0); // can be -1 also
    }
    // if (e.key === "ArrowUp" && selectedItem > 0) {
    //   setSelectedItem((prev) => prev - 1);
    // } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
    //   setSelectedItem((prev) => prev + 1);
    // } else if (e.key === "Enter" && selectedItem >= 0) {
    //   window.location.href = searchData[selectedItem].show.url;
    //   console.log(searchData[selectedItem].show.url);
    // }
  };
  useEffect(() => {
    if (search !== "") {
      fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
        .then((res) => res.json())
        .then((data) => setSearchData(data));
    } else {
      setSearchData([]);
    }
  }, [search]);
  return (
    <section className="search_section">
      <div className="search_input_div">
        <input
          type="text"
          className="search_input"
          placeholder="Search..."
          autoComplete="off"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <div className="search_icon">
          {search === "" ? <SearchIcon /> : <CloseIcon onClick={handleClose} />}
        </div>
      </div>
      <div className="search_result">
        {searchData.map((data, index) => {
          return (
            <a
              key={index}
              href={data.show.url}
              target="_blank"
              className={
                selectedItem === index
                  ? "search_suggestion_line active"
                  : "search_suggestion_line"
              }
            >
              {data.show.name}
              <br /> Ratings: {data.score}
            </a>
          );
        })}
        <a href="#" target="_blank" className="search_suggestion_line">
          This is suggestion line.
        </a>
      </div>
    </section>
  );
};

export default SearchBar;
