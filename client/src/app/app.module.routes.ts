import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { StatementComponent } from './components/statement/statement.component';

import { UserSignedInGuard } from './guards/user-signed-in.guard';

const ROUTES: Routes = [
  { path: '', component: SignInPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [UserSignedInGuard] },
  { path: 'statement', component: StatementComponent, canActivate: [UserSignedInGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
