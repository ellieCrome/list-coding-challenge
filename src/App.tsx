import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Auth, Home } from "./Routes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
