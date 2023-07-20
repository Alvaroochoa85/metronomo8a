import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetronomeComponent } from './metronome/metronome.component';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MetronomeComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
