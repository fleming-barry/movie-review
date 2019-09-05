import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs';
import {MovieListResponse} from '../models/MovieListResponse';

const OMDB_API = 'http://www.omdbapi.com/?apikey=2ad4d3b5';
@Injectable({
  providedIn: 'root'
})
export class OmDbApiService {

  constructor(private httpClient: HttpClient) { }

  getOmdbApiData(params: string) {
    return this.httpClient.get<MovieListResponse>(OMDB_API + params);
  }
}
