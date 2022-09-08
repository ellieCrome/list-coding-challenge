import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../App";

import { Track } from "../../../Interfaces/Track";
import { TrackCard } from "./TrackCard";

const getTopTracks = async (authToken: string): Promise<Array<Track>> => {
  const url = "https://api.spotify.com/v1/me/top/tracks";

  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const response = await fetch(url, options);
  const jsonResponse = await response.json();

  return jsonResponse.items;
};

export const TrackList = () => {
  const [topTracks, setTopTracks] = useState<Array<Track>>();
  const authToken = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const topTracks = await getTopTracks(authToken);

      if (topTracks) {
        setTopTracks(topTracks);
        console.log("tracks", topTracks);
      }
    };

    fetchData();
  }, [authToken]);

  if (!topTracks) return <div> Oopsie theres an error</div>;
  return (
    <>
      {topTracks.map((track) => {
        const { name, artists, explicit } = track;
        const combinedArtists = artists.map((artist) => artist.name).join(", ");

        return (
          <TrackCard
            name={name}
            artists={combinedArtists}
            explicit={explicit}
          />
        );
      })}
    </>
  );
};
