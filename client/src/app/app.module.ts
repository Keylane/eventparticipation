import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EventlistComponent } from './components/eventlist/eventlist.component';

import { EventService } from './services/event.service';
import { EventComponent } from './components/event/event.component';

import { ParticipationStatusPipe } from './pipes/participation-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventlistComponent,
    EventComponent,
    ParticipationStatusPipe
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
