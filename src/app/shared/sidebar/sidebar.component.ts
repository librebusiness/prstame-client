import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { apiRoot as _api } from 'src/app/api';
import { UserService } from 'src/app/services/user.service';
import { authSelector } from 'src/app/reducers/auth.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  userProfile = this.store.select(state => state.auth.user);
  apiRoot = _api;
  avatar: string = '';
  
  constructor(
    private store: Store<AppState>,
    private userService: UserService,
  ) {
    this.store.select(authSelector).subscribe(auth => {
      if (auth.user) {
        this.userService.getAvatar(auth.user._id).subscribe((response: any) => {
          if (response) {
            this.avatar = response;
          } else {
            this.avatar = '//picsum.photos/128'
          }
        }, (error) => {
          this.avatar = '//picsum.photos/128'
        })
      }
    })
  }

}
