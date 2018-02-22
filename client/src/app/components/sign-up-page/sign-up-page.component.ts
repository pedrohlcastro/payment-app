import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { TranslateService } from 'ng2-translate';
import StringMask from 'string-mask';

import { AuthService } from './../../services/auth.service';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX = /^\(\d{2,}\)\d{4,}\-\d{4}$/;

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  public signUpForm: FormGroup;
  private toasterMsgs;

  phoneValidator = {
    phone2digits: new StringMask('(00)'),
    phone6digits: new StringMask('(00)0000-'),
    phone10digits: new StringMask('(00)0000-0000'),
    phone11digits: new StringMask('(00)00000-0000'),
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService,
    private translateService: TranslateService
  ) { }

  signUp(newUser, isValid: boolean) {
    if (isValid) {
      this.authService.signUp(newUser)
        .subscribe(
          (res) => {
            if (res.result === 'Success') {
              this.notificationService.success(this.toasterMsgs.success.successMsg, this.toasterMsgs.closeMsg);
              this.notificationService.info(this.toasterMsgs.success.infoMsg, this.toasterMsgs.closeMsg);
              this.router.navigateByUrl('/signin');
            }
          },
          (err) => {
            const result = JSON.parse(err._body).result;
            if (result === 'Email already registered') {
                            this.notificationService.error(this.toasterMsgs.error.email, this.toasterMsgs.closeMsg);
            }else {
              this.notificationService.error(this.toasterMsgs.default.message, this.toasterMsgs.default.help);
            }
          }
        );
    }else {
      this.notificationService.error(this.toasterMsgs.default.message, this.toasterMsgs.default.help);
    }
  }

  ngOnInit() {
    // load i18n toaster messages
    this.translateService.get('signUp.messages')
      .subscribe((res) => {
        this.toasterMsgs = res;
      });
    this.signUpForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      email: new FormControl('', [<any>Validators.required, <any>Validators.pattern(EMAIL_REGEX)]),
      phone: new FormControl('', [<any>Validators.required, <any>Validators.pattern(PHONE_REGEX)]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
      company: new FormControl('', [<any>Validators.required]),
    });
  }

  phoneInputMask() {
    const phone = this.signUpForm.get('phone').value;

    // Remove letters
    let newPhone = phone.toString().replace(/[^0-9]/g, '');
    if (newPhone.length < 3) {
      newPhone = this.phoneValidator.phone2digits.apply(newPhone);
    } else if (newPhone.length < 5) {
      newPhone = this.phoneValidator.phone6digits.apply(newPhone);
    } else if (newPhone.length < 10) {
      newPhone = this.phoneValidator.phone10digits.apply(newPhone);
    } else if (newPhone.length < 11) {
      newPhone = this.phoneValidator.phone11digits.apply(newPhone);
    } else {
      // Remove last char
      newPhone = newPhone.slice(0, - 1);
      newPhone = this.phoneValidator.phone11digits.apply(newPhone);
    }
    newPhone.trim();
    // Update Value
    this.signUpForm.patchValue({ phone: newPhone});
  }
}
