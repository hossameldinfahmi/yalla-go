import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true;
  password = '';
  email = '';
  currentLang = 'ar';

  constructor(private translate: TranslateService, private router: Router) {
    // Set default language if not set
    if (!this.translate.currentLang) {
      this.translate.setDefaultLang('ar');
      this.translate.use('ar');
    }
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.setDirection();
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.setDirection();
    });
  }

  setDirection() {
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  onLogin() {}
  onForgotPassword() {
      this.router.navigate(['/auth/forgot-password']);
  }
  
}
