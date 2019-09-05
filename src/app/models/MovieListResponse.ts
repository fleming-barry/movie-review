import {Movie} from './movie';

export class MovieListResponse {
  totalResults: string;
  Response: boolean;
  Search: Movie[];
}
