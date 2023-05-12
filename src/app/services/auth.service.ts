import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginPayload } from '../interfaces/login-payload';
import { apiRoot } from '../api';
import { SignupPayload } from '../interfaces/signup-payload';
import { LoginResponse } from '../interfaces/login-response';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AuthActionTypes } from '../reducers/auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private state: Store<AppState>,
    private router: Router,
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('access_token') || '',
    });
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(apiRoot + '/auth/login', payload);
  }

  signup(payload: SignupPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(apiRoot + '/auth/signup', payload);
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(apiRoot + '/auth/forgot-password', { email }, { headers: this.headers });
  }

  resetPassword(payload: {password: string, _id: string, token: string}): Observable<any> {
    return this.http.post(apiRoot + '/auth/password-reset', payload, { headers: this.headers });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('access_token');
      this.state.dispatch({ type: AuthActionTypes.userLogout });
      this.router.navigate(['/auth']).then(() => {
        resolve();
      });
    });
  }
}
