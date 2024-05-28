export interface EpisodeModel {
  info: Info;
  results: EpisodeResult[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}

export interface EpisodeResult {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
