interface Artist {
  genres: Array<string>;
  name: string;
  popularity: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Track {
  album: {
    release_date: string;
    images: Array<Image>;
  };
  artists: Array<Artist>;
  explicit: boolean;
  name: string;
}
