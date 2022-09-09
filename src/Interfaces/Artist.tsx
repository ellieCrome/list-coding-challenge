export interface Artist {
  genres: Array<string>;
  name: string;
  images: Array<Image>;
  popularity: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}
