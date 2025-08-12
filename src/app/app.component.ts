import { Component } from '@angular/core';
import { LoadingService } from './shared/loading.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  showNavbar = true;

  constructor(private loading: LoadingService, private router: Router) {
    this.handleNavbarVisibility();
    this.loadData();
  }

  loadData() {
    this.loading.show();
    setTimeout(() => {
      this.loading.hide();
    }, 2000);
  }

  handleNavbarVisibility() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        this.showNavbar = !(currentUrl.includes('/login') || currentUrl.includes('/forgot-password'));
      });
  }
}
