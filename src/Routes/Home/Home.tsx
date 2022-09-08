import React, { useEffect, useState } from "react";
import { User } from "../../Interfaces/User";
import { Track } from "../../Interfaces/Track";

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
  console.log(response);
  const jsonResponse = await response.json();

  console.log(jsonResponse);
  return jsonResponse.items;
};

export const Home = ({ authToken }: { authToken: string }) => {
  const [user, setUser] = useState<User>();
  const [topTracks, setTopTracks] = useState<Array<Track>>();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser(authToken);
      const topTracks = await getTopTracks(authToken);

      if (user) {
        setUser(user);
        console.log("user", user);
      }

      if (topTracks) {
        setTopTracks(topTracks);
        console.log("tracks", topTracks);
      }
    };

    fetchData();
  }, []);

  if (!user || !topTracks) return null;

  const { display_name: name, followers } = user;
  const { total: followersCount } = followers;

  return (
    <>
      <Header name={name} followersCount={followersCount} />

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
