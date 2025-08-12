import { Component } from '@angular/core';
import { LoadingService } from './shared/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
   constructor(private loading: LoadingService) {
    this.loadData();
   }

  loadData() {
    this.loading.show();

    setTimeout(() => {
      this.loading.hide();
    }, 2000); 
  }
}
