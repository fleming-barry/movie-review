import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Movie} from '../models/movie';
import {SharedMovieListService} from '../shared-movie-list.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  movies: Movie[];

  constructor(private sharedMovieList: SharedMovieListService) {
  }

  ngOnInit() {
  }

  onMovieList($event) {
    this.movies = $event;
  }
  addMovieToList(movie: Movie) {
    this.sharedMovieList.addMovieToList(movie);
  }
}
