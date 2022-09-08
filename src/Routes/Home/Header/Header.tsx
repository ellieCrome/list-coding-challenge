import React, { useState, useEffect, useContext } from "react";

import { User } from "../../../Interfaces/User";
import { AuthContext } from "../../../App";

import { Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./header.css";

const getUser = async (authToken: string): Promise<User | null> => {
  if (!authToken) return Promise.resolve(null);

  const url = "https://api.spotify.com/v1/me";

  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  };

  const response = await fetch(url, options);
  return await response.json();
};

export const Header = () => {
  const [user, setUser] = useState<User>();
  const authToken = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser(authToken);

      if (user) {
        setUser(user);
      }
    };

    fetchData();
  }, [authToken]);

  if (!user) return null;

  const { display_name: name, followers } = user;
  const { total: followersCount } = followers;

  return (
    <div className="header">
      <h1>Welcome {name}!</h1>

      <Divider variant="fullWidth" flexItem />

      <div className="followers-container">
        <span>
          You have <b>{followersCount} followers</b> way to go
        </span>

        <span className="icon">
          <FontAwesomeIcon icon={faThumbsUp} />
        </span>
      </div>
    </div>
  );
};
