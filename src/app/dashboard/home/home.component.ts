import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user = this.store.select(state => state.auth.user);
  ready = false;
  url: string = '';

  constructor(
    private store: Store<AppState>,
  ) {
  }

}
