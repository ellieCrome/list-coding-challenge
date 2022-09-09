import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

import "./artistCard.css";

export const ArtistCard = ({
  imageUrl,
  name,
  genres,
  popularity,
}: {
  imageUrl: string;
  name: string;
  genres: string;
  popularity: number;
}) => (
  <Card variant="outlined">
    <CardContent className="card">
      <img
        src={imageUrl}
        alt={`${name} album art`}
        width="75px"
        height="75px"
      />
      <div className="description">
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography>{genres}</Typography>
      </div>

      {popularity ? (
        <Chip className="popularity" label={`Popularity:  ${popularity}%`} />
      ) : null}
    </CardContent>
  </Card>
);
