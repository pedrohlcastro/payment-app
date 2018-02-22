import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Licenta';
  public toasterOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'scale',
    position: ['top', 'left'],
    theClass: 'notifications',
  };

  constructor(private translate: TranslateService, private authService: AuthService, private router: Router){
    translate.setDefaultLang('pt-br');
    translate.use('pt-br');
    // BUG? SO ABRE UMA PAG DIFERENTE SE NAVEGAR VIA APLICAçÃO QUANDO COLOCA URL DIRETAMENTE, FICA EM LOOP 
    // this.authService.checkToken().subscribe((res) => {
    //   if (res.result === 'Success') {
    //     this.router.navigateByUrl('/map');
    //   }
    // });
  }


}
