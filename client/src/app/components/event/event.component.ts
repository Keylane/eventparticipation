import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, Participant } from '../../interfaces/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private routeSubscription: any;
  private id: any;
  private event: Event;
  private participants: Participant[];

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

  deleteParticipant(index: number) {
    this.participants.splice(index, 1);
  }

  addParticipant(inputObj: string) {
    let name: string = inputObj.value;
    if (name == null || name === "") {
      return;
    }
    this.participants.push(name);
    this.sortParticipants();
    inputObj.value = "";
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventService.getEvent(this.id).subscribe((response) => {
        this.event = response;
      });
      this.eventService.getParticipants(this.id).subscribe((response) => {
        this.participants = response.participants;
        this.sortParticipants();
      });
    });
  }

  sortParticipants() {
    this.participants.sort((a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
