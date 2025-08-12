import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [NotFoundComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [NotFoundComponent, LoadingSpinnerComponent, LoadingSpinnerComponent]
})
export class SharedModule {}
