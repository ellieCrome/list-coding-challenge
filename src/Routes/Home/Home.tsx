import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import { Header } from "./Header";

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

export const Home = () => {
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
  }, []);

  if (!topTracks) return <div> Oopsie theres an error</div>;

  return (
    <>
      <Header />

      <h2>Your Top Tracks</h2>

      {topTracks.map((track) => {
        return (
          <div>
            <span>{track.name} </span>
            <div>
              <span>Artists:</span>
              {track.artists.map((artist) => {
                return <span>{artist.name}</span>;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
