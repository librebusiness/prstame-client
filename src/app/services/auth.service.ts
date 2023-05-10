import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginPayload } from '../interfaces/login-payload';
import { apiRoot } from '../api';
import { SignupPayload } from '../interfaces/signup-payload';
import { LoginResponse } from '../interfaces/login-response';
import { SignupResponse } from '../interfaces/signup-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(apiRoot + '/auth/login', payload);
  }

  signup(payload: SignupPayload): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(apiRoot + '/auth/signup', payload);
  }
}
