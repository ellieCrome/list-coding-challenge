import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

import "./trackCard.css";

export const TrackCard = ({
  imageUrl,
  name,
  artists,
  explicit,
}: {
  imageUrl: string;
  name: string;
  artists: string;
  explicit: boolean;
}) => (
  <Card variant="outlined" raised>
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
        {explicit ? <Chip className="chip" label="explict" /> : null}
        <Typography>{artists}</Typography>
      </div>
    </CardContent>
  </Card>
);
