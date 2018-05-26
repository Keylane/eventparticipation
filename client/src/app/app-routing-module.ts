import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event/:id', component: EventComponent },
  { path: '**', component: HomeComponent } // Other/unknown route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true, useHash:true })],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class RoutingModule { }
