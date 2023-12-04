import React from "react";
import SearchBar from "./components/SearchBar";

import "./App.css";
import SearchBookBar from "./components/SearchBook";

const App = () => {
  return (
    <div className="app">
      <SearchBar />
      <SearchBookBar />
    </div>
  );
};

export default App;
