import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Home } from "./Routes";

export const AuthContext = createContext("");

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
          <Route
            path="/"
            element={
              <AuthContext.Provider value={token}>
                <Home />
              </AuthContext.Provider>
            }
          />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
