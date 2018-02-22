import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { AuthService } from './../../services/auth.service';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  public signInForm: FormGroup;
  private toasterMsgs;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService,
  ) { }

  signIn(user, isValid: boolean) {
    console.log(user);
    if (isValid) {
      this.authService.signIn(user.email, user.password)
        .subscribe((res) => {
          if (res) {
            this.notificationsService.success('Logado com Sucesso', 'Clique Para fechar');
            this.router.navigateByUrl('/home');
          }
        },
        (err) => {
          const result = JSON.parse(err._body).result;
          this.notificationsService.error('Error ao logar', 'Tente novamente');
        });
    } else {
      this.notificationsService.error('Email ou senha inválidos', 'Clique para fechar');
    }
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required, <any>Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl('', [<any>Validators.required])
    });
  }
}
