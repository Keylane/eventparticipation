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

  ngOnInit() {
    this.eventService.getEvents().subscribe((response) => {
      this.eventList = response;
    });
  }

}
