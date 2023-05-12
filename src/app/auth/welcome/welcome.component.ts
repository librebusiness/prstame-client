import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(
    private state: Store<AppState>,
    private router: Router,
    ) {
    this.state.select(state => state.auth).subscribe(auth => {
      if (auth.status == 'loaded') {
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
