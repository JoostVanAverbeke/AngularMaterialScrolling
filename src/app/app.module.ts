import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { SpecDataComponent } from './spec-data/spec-data.component';
import { BasicsComponent } from './basics/basics.component';
import { ScrollingStrategyComponent } from './scrolling-strategy/scrolling-strategy.component';
import { TrackbyComponent } from './trackby/trackby.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecDataComponent,
    BasicsComponent,
    ScrollingStrategyComponent,
    TrackbyComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
