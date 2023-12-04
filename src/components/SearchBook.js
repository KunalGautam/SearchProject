import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import data from "../books.json";

import "./SearchBar.css";
import { useState } from "react";

const SearchBookBar = () => {
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
        const element = document.getElementsByClassName("active");
        element[0].scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        const element = document.getElementsByClassName("active");
        console.log(element);
        if (element.length > 0) {
          element[0].scrollIntoView({
            behavior: "smooth",
          });
        }

        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        window.location.href = searchData[selectedItem].link;
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
      const newFilterData = data.filter((book) => {
        return book.title.includes(search);
      });
      setSearchData(newFilterData);
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
              href={data.link}
              target="_blank"
              className={
                selectedItem === index
                  ? "search_suggestion_line active"
                  : "search_suggestion_line"
              }
            >
              {data.title}
              <br /> Pages: {data.pages} - {data.link}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default SearchBookBar;
