import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../App";

import { TrackCard } from "../TrackCard";
import { ArtistCard } from "../ArtistCard";

import { Track } from "../../../Interfaces/Track";
import { Artist } from "../../../Interfaces/Artist";

const fetchGET = async (url: string, authToken: string): Promise<any> => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  };
  const response = await fetch(url, options);
  const jsonResponse = await response.json();

  return jsonResponse.items;
};

const getTopTracks = async (authToken: string): Promise<Array<Track>> => {
  const url = `https://api.spotify.com/v1/me/top/tracks`;

  return await fetchGET(url, authToken);
};

const getTopArtists = async (authToken: string): Promise<Array<Artist>> => {
  const url = `https://api.spotify.com/v1/me/top/artists`;

  return await fetchGET(url, authToken);
};

export const TrackList = ({ type }: { type: string }) => {
  const [topTracks, setTopTracks] = useState<Array<Track>>();
  const [topArtists, setTopArtists] = useState<Array<Artist>>();
  const authToken = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const topTracks = await getTopTracks(authToken);
      const topArtists = await getTopArtists(authToken);

      if (topTracks) {
        setTopTracks(topTracks);
        console.log("tracks", topTracks);
      }

      if (topArtists) {
        setTopArtists(topArtists);
        console.log("artists", topArtists);
      }
    };

    fetchData();
  }, [authToken]);

  if (!topTracks || !topArtists) return <div> Oopsie theres an error</div>;

  return (
    <>
      {type === "tracks"
        ? topTracks.map((track) => {
            const { name, artists, explicit, album } = track;
            const combinedArtists = artists
              .map((artist) => artist.name)
              .join(", ");

            return (
              <div key={name}>
                <TrackCard
                  imageUrl={album.images[0].url}
                  name={name}
                  artists={combinedArtists}
                  explicit={explicit}
                />
              </div>
            );
          })
        : topArtists.map((artist) => {
            const { name, genres, images, popularity } = artist;
            const combinedGenres = genres.join(", ");

            return (
              <div key={name}>
                <ArtistCard
                  imageUrl={images[0].url}
                  name={name}
                  genres={combinedGenres}
                  popularity={popularity}
                />
              </div>
            );
          })}
    </>
  );
};
