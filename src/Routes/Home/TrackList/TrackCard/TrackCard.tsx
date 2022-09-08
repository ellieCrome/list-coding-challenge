import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

export const TrackCard = ({
  name,
  artists,
  explicit,
}: {
  name: string;
  artists: string;
  explicit: boolean;
}) => (
  <Card variant="outlined" raised>
    <CardContent>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <Typography>{artists}</Typography>

      {explicit ? <Chip label="explict" /> : null}
    </CardContent>
  </Card>
);
