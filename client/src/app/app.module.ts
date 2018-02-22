// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.module.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.module.material';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpModule, Http } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ProgressHttpModule } from 'angular-progress-http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2DragDropModule } from 'ng2-drag-drop';

// Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateProcessDialogComponent } from './components/create-process-dialog/create-process-dialog.component';

// Services
import { AuthService } from './services/auth.service';
import { TransactionService } from './services/transaction.service';

// Guards
import { UserSignedInGuard } from './guards/user-signed-in.guard';

// Pipe
import { SafePipe } from './pipes/safe.pipe';
import { FilterTextPipe } from './pipes/filter-text.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { StatementComponent } from './components/statement/statement.component';


// i18n factory
export const createTranslateLoader = (http: Http) => {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
};


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    NavbarComponent,
    SafePipe,
    CreateProcessDialogComponent,
    FilterTextPipe,
    DateFormatPipe,
    TruncatePipe,
    StatementComponent,
  ],
  entryComponents: [
    CreateProcessDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ImageCropperModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDu6f9HJDRCttqbKcdJ5BLCGRWid6pPvk'
    }),
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    ProgressHttpModule,
    Ng2DragDropModule.forRoot(),
  ],
  providers: [
    AuthService,
    TransactionService,
    UserSignedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
