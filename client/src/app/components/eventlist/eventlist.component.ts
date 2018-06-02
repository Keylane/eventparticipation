import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  eventList: Event[];

  constructor(private eventService: EventService, private router: Router) { }

  addEvent(eventObj : any) : void {
    if (String(eventObj.value).length > 0) {
      this.eventService.createEvent(eventObj.value).subscribe((response) => {
        this.router.navigate(['/event/' + response.id]);
      });
    }
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((response) => {
      this.eventList = response;
    });
  }

  ngOnInit() {
      this.loadEvents();
  }
}
