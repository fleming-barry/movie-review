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
  showList = false;
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
        const alreadyAdded: boolean = control.controls.some((formControl) => {
          return Object.is(formControl.value, this.listMovies[this.listMovies.length - 1]);
        });
        if (!alreadyAdded) {
          control.push(new FormControl((this.listMovies[this.listMovies.length - 1])));
        }
      }
    });
  }

  toggleList() {
    this.showList = !this.showList;
    this.buttonName = this.showList ? 'Hide List' : 'Create List';
  }

  changeRank(imdbId: string, rank: number) {
    const index = this.listMovies.findIndex(movie => movie.imdbID === imdbId);
    this.listMovies[index].rank = rank;
    const control = this.movieListFormGroup.controls.listFormMovies as FormArray;
    control.setControl(index, new FormControl(this.listMovies[index]));
  }

  createNewList() {
    const movieList = this.movieListFormGroup.controls;
    console.log(movieList);
  }


}
