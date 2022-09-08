import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Home } from "./Routes";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch("/auth/token");
      const json = await response.json();

      setToken(json.accessToken);
    };

    getToken();
  }, []);

  return (
    <div>
      <Routes>
        {token ? (
          <Route path="/" element={<Home authToken={token} />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
