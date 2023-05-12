import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { apiRoot } from '../api';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders({
      'x-access-token': localStorage.getItem('access_token') || '',
      'Content-Type': 'application/json'
    });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(apiRoot + '/user/profile', {
      headers: this.headers
    }).pipe(tap(_ => console.log(_)));
  }

  updateProfile(payload: User): Observable<User> {
    return this.http.post<User>(apiRoot + '/user/profile', {
      headers: this.headers
    });
  }

  updatePassword(payload: { password: string, oldPassword: string }) {
    return this.http.post(apiRoot + '/update-password', payload, {
      headers: this.headers
    });
  }

  requestEmailConfirmation() {
    return this.http.post(apiRoot + '/confirm-email', {}, {
      headers: this.headers
    });
  }

  confirmEmail(id: string, confirmation_token: string) {
    return this.http.post(apiRoot + '/confirm-email/' + id, { confirmation_token });
  }

  requestEmailChange(email: string) {
    return this.http.post(apiRoot + '/update-email', { email }, {
      headers: this.headers
    });
  }

  updateEmail(id: string, confirmation_token: string) {
    return this.http.post(apiRoot + '/update-email/' + id, { confirmation_token })
  }

  uploadAvatar(data: string) {
    return this.http.post(apiRoot + '/upload-avatar', { image: data }, {
      headers: this.headers
    });
  }

  getAvatar(id:string) {
    return this.http.get(apiRoot + '/uploads/'+id);
  }

}
