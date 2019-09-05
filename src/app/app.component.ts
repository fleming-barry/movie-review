import {Component, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [HttpClientModule]
  // ...
})
export class AppComponent {
  title = 'movie-review';
}
