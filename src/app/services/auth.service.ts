import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { Observable, of } from 'rxjs';
// import { Role } from './../models/role.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface Result {
  staus: string;
  error: string;
  response: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = 'http://localhost:3000';

  constructor(public http: HttpClient) { }


  async login(email: string, password: string) {
    const result = await this.http.post(`${this.endpoint}/auth/login`, { email, password }).toPromise();
    // console.log(result);
    if (!result['error']) {
      const token = result['token'];
      localStorage.setItem('token', token);
      const helper = new JwtHelperService();
      const user = helper.decodeToken(token)['user'];
      // console.log(user);
      return { user: user , error: null };
    } else {
      console.log(result['error']);
      return { user: null, error: result['error'] };
    }
  }

  async register(email: string, password: string, name: string) {
    const result = await this.http.post(`${this.endpoint}/auth/register`, { email, password, name }).toPromise();
    console.log(result);
    if (!result['error']) {
      return { result: result['response'], error: null };
    } else {
      return { result: null, error: result['error'] };
    }
  }

}
