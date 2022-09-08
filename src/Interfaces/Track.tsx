interface Artist {
  genres: Array<string>;
  name: string;
  popularity: number;
}

export interface Track {
  album: {
    release_date: string;
  };
  artists: Array<Artist>;
  explicit: boolean;
  name: string;
}
