import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Movie} from '../models/movie';
import {SharedMovieListService} from '../shared-movie-list.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  showList: boolean;
  buttonName = 'Create List';
  moviesMap: Map<string, Movie>;
  listMovies: Movie[];
  movieListFormGroup = new FormGroup({
    listFormTitle: new FormControl(''),
    listFormMovies: new FormArray([]),
  });

  constructor(private sharedMovieList: SharedMovieListService) {
  }

  ngOnInit() {
    this.sharedMovieList.getMovieList().subscribe(res => {
      if (this.showList) {
        this.moviesMap = res;
        this.listMovies = Array.from(this.moviesMap.values());
        const control = this.movieListFormGroup.controls.listFormMovies as FormArray;
        console.log(control);
        control.push(new FormControl((this.listMovies[this.listMovies.length - 1])));
      }
    });
  }

  toggleList() {
    this.showList = !this.showList;
    this.buttonName = this.showList ? 'Create List' : 'Hide List';
  }

  createNewList() {
    const movieList = this.movieListFormGroup.controls;
    console.log(movieList);
  }


}
