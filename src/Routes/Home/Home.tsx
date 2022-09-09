import React, { useState } from "react";

import { Header } from "./Header";
import { TrackList } from "./TrackList";

import { Container, Button } from "@mui/material";

import "./home.css";

export const Home = () => {
  const [showArtists, setShowArtists] = useState(false);
  const track = "tracks";
  const artist = "artists";

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Button
          className="button"
          variant="outlined"
          onClick={() => setShowArtists(!showArtists)}
        >
          What about your favourite {showArtists ? track : artist}?
        </Button>

        {showArtists ? (
          <>
            <h2>Your Top Artists</h2>
            <TrackList type="artists" />
          </>
        ) : (
          <>
            <h2>Your Top Tracks</h2>
            <TrackList type="tracks" />
          </>
        )}
      </Container>
    </>
  );
};
