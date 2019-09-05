import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {OmDbApiService} from '../amdbapi-service/om-db-api.service';

@Component({
  selector: 'app-movie-selector',
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.css']
})
export class MovieSelectorComponent implements OnInit {
  movies: Movie[];
  types: string[] = ['Movie', 'Episode', 'Series'];

  @Output() moviesRequestEvent = new EventEmitter<Movie[]>();
  readonly years: number[] = MovieSelectorComponent._generateYears();
  typeCtrl = new FormControl();
  filteredTypes: Observable<string[]>;
  yearCtrl = new FormControl();
  filteredYears: Observable<number[]>;
  movieSelectForm = new FormGroup({
    movieTitle: new FormControl(''),
    movieType: new FormControl(),
    year: new FormControl()
  });

  constructor(private omdbApiService: OmDbApiService) {

    this.filteredYears = this.yearCtrl.valueChanges
      .pipe(
        startWith(),
        map(year => year ? this._filteredYears(year) : this.years.slice())
      );
  }

  private static _generateYears(): number[] {
    const year = new Date().getFullYear();
    // tslint:disable-next-line:prefer-const
    let years: number[] = [];
    // tslint:disable-next-line:variable-name
    for (let _i = year; _i >= 1865; _i--) {
      years.push(_i);
    }
    return years;
  }
  ngOnInit() {
  }

  onSubmit() {
    const movieTitle = this.movieSelectForm.controls.movieTitle.value;
    const movieYear = this.movieSelectForm.controls.year.value;
    const movieType = this.movieSelectForm.controls.movieType.value;
    const query = (movieTitle ? `&s=${movieTitle}` : '') + (movieYear ? `&y=${movieYear}` : '')
      + (movieType ? `&type=${movieType}` : '') + '&page=1';
    console.log(query);
    this.omdbApiService.getOmdbApiData(query).subscribe(
      (res) => {
        console.log(res.Search);
        this.movies = res.Search;
        this.moviesRequestEvent.emit(this.movies);
      }, (error => {
        console.error(error);
      }));
  }

  private _filteredYears(value: number): number[] {
    return this.years.filter(year => year.toString().indexOf(value.toString()) === 0);
  }

  private _filteredTypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.types.filter(type => type.toLowerCase().indexOf(filterValue) === 0);
  }


}
