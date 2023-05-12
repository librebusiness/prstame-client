import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { UserActionTypes } from '../reducers/user.actions';
import { AuthActionTypes } from '../reducers/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private state: Store<AppState>,
    ) {
  }

  ngOnInit(): void {
    this.state.dispatch({ type: AuthActionTypes.loadUserStart });
  }
}
