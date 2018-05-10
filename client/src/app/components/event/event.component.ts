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

  fileChanged($event):void {
		let file = (<HTMLInputElement>document.getElementById("file")).files[0];
		//new fileReader
		var fileReader = new FileReader();
		fileReader.readAsText(file);
		//try to read file, this part does not work at all, need a solution
		fileReader.onload = function(event) {
      let content: string = (<FileReader>event.target).result
      let lines: string[] = content.split("\n");
      let acceptedParticipants: Set<string> = new Set();
      for (var i = 1; i < lines.length; i++) {
        let line: string = lines[i];
        let lineContent: string[] = line.split("\t");
        if (lineContent.length != 3) {
          console.log("WRONG FORMAT IN LINE " + i);
          continue;
        }
        let participantName: string = lineContent[0];
        let participantAnswer: string = encodeURI(lineContent[2]);
        if (participantAnswer == "Accepted%0D" || participantAnswer == "Accepteret%0D") {
          acceptedParticipants.add(participantName);
        }
      }
      console.log(acceptedParticipants);
		}
	}

  deleteParticipant(index: number) : void {
    this.participants.splice(index, 1);
  }
  
  addParticipant(inputObj: any) : void {
    let name: string = inputObj.value;
    if (name == null || name === "") {
      return;
    }
    let newParticipant: Participant = {
      name: name
    }
    this.participants.push(newParticipant);
    this.sortParticipants();
    inputObj.value = "";
  }

  save(): void {
    this.eventService.saveParticipants(this.id, this.participants).subscribe((response) => {
      this.loadParticipants();
    });
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventService.getEvent(this.id).subscribe((response) => {
        this.event = response;
      });
      this.loadParticipants();
    });
  }

  loadParticipants(): void {
    this.eventService.getParticipants(this.id).subscribe((response) => {
      this.participants = response.participants;
      this.sortParticipants();
    });
  }

  sortParticipants() {
    this.participants.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
