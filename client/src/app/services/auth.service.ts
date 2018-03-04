import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  private userToken: string;
  public loggedIn = new BehaviorSubject <boolean>(false);
  public adminLoggedIn = new BehaviorSubject <boolean>(false);
  private authUser;

  constructor(private http: Http) {
    this.userToken = null;
  }

  // adds headers, if appendAuthorization true adds Authorization header
  addAuthHeader(appendAuthorization: boolean) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (appendAuthorization) {
      if (this.userToken) {
        headers.append('Authorization', this.userToken);
      } else {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
          headers.append('Authorization', userToken.token);
        }
      }
    }
    return new RequestOptions({ headers: headers });
  }

  // signIn method
  signIn(email: string, password: string) {
    const options = this.addAuthHeader(false);
    const user = {
      username: email,
      password: password
    };
    this.authUser = email;
    return this.http.post('/api/auth/signin', user, options)
      .map((res) => {
        const resJSON = res.json();
        this.userToken = resJSON.token || null;
        if (this.userToken) {
          localStorage.setItem('userToken', JSON.stringify({ token: this.userToken }));
          this.loggedIn.next(true);
          return true;
        }
        return false;
      },
      (err) => {
        return err.json();
      }
    );
  }

  // signUp method
  signUp(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/api/auth/signup', user, options)
            .map((res) => {
              return res.json();
            });
  }

  // logout method
  logout(): void {
    // clear token remove user from local storage to log user out
    this.loggedIn.next(false);
    this.adminLoggedIn.next(false);
    this.userToken = null;
    localStorage.removeItem('userToken');

  }

  // get user profile
  getUser() {
    const options = this.addAuthHeader(true);
    return this.http.get('/api/auth/user', options)
            .map((res) => {
              return res.json();
            });
  }

  // check Token
  checkToken() {
    const options = this.addAuthHeader(true);
    return this.http.get('/api/auth/checktoken', options)
            .map((res) => {
              const resJSON = res.json();
              if (resJSON.result === 'Success') {
                this.authUser = resJSON.user._id;
                this.loggedIn.next(true);
              }
              return resJSON;
            });
  }


  getToken() {
    if (this.userToken) {
      return this.userToken;
    } else {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      if (userToken) {
        return userToken.token;
      } else {
        return null;
      }
    }
  }

  getCompanyUser() {
    const options = this.addAuthHeader(true);
    return this.http.get('/api/auth/companyusers', options)
                    .map((res) => {
                      return res.json();
                    });
  }

  getUserEmail() {
    return this.authUser;
  }
}
