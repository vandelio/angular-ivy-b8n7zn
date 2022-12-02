import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AnimatedGaugeComponent } from './animated-gauge/animated-gauge.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, AnimatedGaugeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
