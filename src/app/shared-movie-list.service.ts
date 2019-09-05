import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Movie} from './models/movie';

@Injectable({
  providedIn: 'root'
})
export class SharedMovieListService {
  private movieListSubject: BehaviorSubject<Map<string, Movie>> = new BehaviorSubject(new Map<string, Movie>());

  constructor() {
  }

  addMovieToList(value: Movie) {
    this.movieListSubject.next(this.movieListSubject.getValue().set(value.imdbID, value));
  }

  getMovieList(): Observable<Map<string, Movie>> {
    return this.movieListSubject.asObservable();
  }
}
