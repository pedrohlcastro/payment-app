import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {

  constructor(private http: Http, private authService: AuthService) {  }

  sendMoney(toUser, value) {
    const options = this.authService.addAuthHeader(true);
    const params = {
      user: toUser,
      value: value
    };
    return this.http.post('/api/transac/sendmoney', params, options)
            .map((res) => {
              return res.json();
            });
  }

  getUsers() {
    const options = this.authService.addAuthHeader(true);
    return this.http.get('/api/transac/listofclients', options)
            .map((res) => {
              return res.json();
            }, (err) => {
              return err.json();
            });
  }

  getStatement() {
    const options = this.authService.addAuthHeader(true);
    return this.http.get('/api/transac/bankstatement', options)
            .map((res) => {
              return res.json();
            }, (err) => {
              return err.json();
            });
  }

  getBalance() {
    const options = this.authService.addAuthHeader(true);
    return this.http.get('/api/transac/balance', options)
            .map((res) => {
              return res.json();
            }, (err) => {
              return err.json();
            });
  }
}
