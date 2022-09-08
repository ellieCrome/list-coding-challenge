import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./header.css";
import { Divider } from "@mui/material";

export const Header = ({
  name,
  followersCount,
}: {
  name: string;
  followersCount: number;
}) => (
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
