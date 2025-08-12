  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { LoginComponent } from './login/login.component';
  import { RouterModule, Routes } from '@angular/router';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { TranslateModule } from '@ngx-translate/core';
  import { MatIconModule } from '@angular/material/icon';
  import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

  const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
  ];

  @NgModule({
    declarations: [LoginComponent, ForgotPasswordComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule,
      MatIconModule
    ]
  })
  export class AuthModule {}
