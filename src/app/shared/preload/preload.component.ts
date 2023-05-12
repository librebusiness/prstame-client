import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent {

  showPreload = this.state.select(state => state.auth.status == 'loading' || state.auth.status == 'idle')

  constructor(
    private state: Store<AppState>,
  ) {}

}
