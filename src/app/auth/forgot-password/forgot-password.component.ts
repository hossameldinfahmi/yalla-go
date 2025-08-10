import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  currentLang = localStorage.getItem('lang') || 'en';

  step = 1;
  email = '';
  otpArray: string[] = ['', '', '', '', '', ''];
  otpControls = Array(6).fill(0);
  otpCounter = 60;
  otpTimer: any;
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  passwordRules = [
    { label: '٨ أحرف على الأقل', valid: false, test: (v: string) => v.length >= 8 },
    { label: 'حرف كبير واحد على الأقل', valid: false, test: (v: string) => /[A-Z]/.test(v) },
    { label: 'حرف صغير واحد على الأقل', valid: false, test: (v: string) => /[a-z]/.test(v) },
    { label: 'رقم واحد على الأقل', valid: false, test: (v: string) => /\d/.test(v) },
    { label: 'رمز خاص “@ # $ % & * !” واحد علي الأقل', valid: false, test: (v: string) => /[@#$%&*!]/.test(v) }
  ];

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    if (!this.translate.currentLang) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.setDirection();
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.setDirection();
    });
  }

  ngOnInit() {
    if (this.step === 2) this.startOtpTimer();
  }

  ngOnDestroy() {
    if (this.otpTimer) clearInterval(this.otpTimer);
  }

  setDirection() {
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  // OTP logic
  onOtpInput(event: any, i: number) {
    const input = event.target;
    const value = input.value;
    if (value.length > 1) {
      this.otpArray[i] = value.charAt(0);
    }
    if (value && i < 5) {
      input.nextElementSibling?.focus();
    }
  }

  onOtpKeyDown(event: KeyboardEvent, i: number) {
    if (event.key === 'Backspace' && !this.otpArray[i] && i > 0) {
      const prev = (event.target as HTMLInputElement).previousElementSibling as HTMLInputElement;
      prev?.focus();
    }
  }

  get otp() {
    return this.otpArray.join('');
  }

  resendOtp() {
    this.otpArray = ['', '', '', '', '', ''];
    this.otpCounter = 60;
    this.startOtpTimer();
    // Call your resend OTP logic here
  }

  startOtpTimer() {
    if (this.otpTimer) clearInterval(this.otpTimer);
    this.otpCounter = 60;
    this.otpTimer = setInterval(() => {
      if (this.otpCounter > 0) {
        this.otpCounter--;
      } else {
        clearInterval(this.otpTimer);
      }
    }, 1000);
  }

  validatePassword() {
    for (const rule of this.passwordRules) {
      rule.valid = rule.test(this.password);
    }
  }

  sendEmail() {
    // Simulate sending email and move to OTP step
    this.step = 2;
    this.startOtpTimer();
  }

  verifyOtp() {
    // Simulate OTP verification and move to password reset step
    if (this.otpArray.join('').length === 6) {
      this.step = 3;
    }
  }

  resetPassword() {
    // Simulate password reset and redirect to login
    if (this.password === this.confirmPassword && this.passwordRules.every(r => r.valid)) {
      this.router.navigate(['/auth/login']);
    }
  }

  suggestPassword() {
    // Generate a password that matches all rules
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '@#$%&*!';
    let password = '';

    // Ensure at least one character from each set
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // Fill the rest with random chars from all sets
    const all = upper + lower + digits + special;
    while (password.length < 10) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    this.password = password;
    this.confirmPassword = password;
    this.validatePassword();
  }
}
