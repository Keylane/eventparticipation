import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  eventList: Event[];

  constructor(private eventService: EventService) { }

  addEvent(eventObj : any) : void {
    this.eventService.createEvent(eventObj.value).subscribe((response) => {
      this.loadEvents();
    });
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
