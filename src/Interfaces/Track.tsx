interface Artist {
  genres: Array<string>;
  name: string;
  popularity: number;
}

export interface Track {
  album: {
    album_type: string;
    total_tracks: number;
  };
  artists: Array<Artist>;
  explicit: boolean;
  name: string;
}
