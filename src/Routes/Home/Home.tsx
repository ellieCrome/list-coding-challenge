import React from "react";

import { Header } from "./Header";
import { TrackList } from "./TrackList";

import { Container } from "@mui/material";

export const Home = () => (
  <>
    <Header />

    <Container maxWidth="lg">
      <h2>Your Top Tracks</h2>
      <TrackList />
    </Container>
  </>
);
