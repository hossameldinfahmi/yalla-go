import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  private baseUrl = 'https://api.example.com/auth'; // Change to your API URL

  constructor(private http: HttpClient) {}

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email, password });
  }
}
