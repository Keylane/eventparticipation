import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, Participant, ParticipationStatus } from '../../interfaces/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private routeSubscription: any;
  private id: any;
  public event: Event;
  public participants: Participant[];
  private file: File;
  public includeTentative: boolean = false;
  public includeNoAnswer: boolean = false;
  public includeDeclined: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) { }

  fileChanged($event):void {
		this.file = (<HTMLInputElement>document.getElementById("inputFile")).files[0];
    this.setFileNameFieldValue(this.file.name);
	}

  loadOutlookExportFile() {
    if (!this.file) return;
    var fileReader = new FileReader();
		fileReader.readAsText(this.file);
    fileReader.onload = (e) => {
      this.parseOutlookExportFile(e);
    }
  }

  parseOutlookExportFile(event: any) {
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
      let participantStatus: ParticipationStatus = this.getParticipantStatus(encodeURI(lineContent[2]))
      if (participantStatus === ParticipationStatus.Accepted) {
        this.addOrUpdateParticipant(participantName, participantStatus);
      } else {
        if (this.includeNoAnswer && participantStatus === ParticipationStatus.NoAnswer) {
          this.addOrUpdateParticipant(participantName, participantStatus);
        }
        if (this.includeDeclined && participantStatus === ParticipationStatus.Declined) {
          this.addOrUpdateParticipant(participantName, participantStatus);
        }
        if (this.includeTentative && participantStatus === ParticipationStatus.Tentative) {
          this.addOrUpdateParticipant(participantName, participantStatus);
        }
      }
    }
    this.sortParticipants();
    // Reset fields for file
    this.file = null;
    (<HTMLInputElement>document.getElementById("inputFile")).value = null;
    this.setFileNameFieldValue("");
  }

  addOrUpdateParticipant(participantName: string, participantStatus: ParticipationStatus): void {
    let existingParticipant: Participant = this.participants.find(participant => participant.name === participantName);
    if (existingParticipant) {
      existingParticipant.status = participantStatus;
    } else {
      this.participants.push(this.buildParticipantObject(participantName, participantStatus))
    }
  }

  getParticipantStatus(answer: string): ParticipationStatus {
    // console.log(answer);
    if (answer == "Accepted%0D" || answer == "Accepteret%0D") {
      return ParticipationStatus.Accepted;
    }
    if (answer == "None%0D" || answer == "Ingen%0D") {
      return ParticipationStatus.NoAnswer;
    }
    if (answer == "Declined%0D" || answer == "Afsl%C3%A5et%0D") {
      return ParticipationStatus.Declined;
    }
    if (answer == "Tentative%0D" || answer == "Forel%C3%B8big%0D") {
      return ParticipationStatus.Tentative;
    }
    return ParticipationStatus.Unknown;
  }

  newParticipantDownEvent(event: any, participantObj: any) : void {
    if(event.keyCode == 13) { // Enter
      this.addParticipant(participantObj);
    }
  }

  setFileNameFieldValue(value: string): void {
    (<HTMLInputElement>document.getElementById("fileNameField")).value = value;
  }

  chooseFile(): void {
    document.getElementById('inputFile').click();
  }

  deleteParticipant(index: number) : void {
    this.participants.splice(index, 1);
  }

  addParticipant(inputObj: any) : void {
    let name: string = inputObj.value;
    if (name == null || name === "") {
      return;
    }
    this.participants.push(this.buildParticipantObject(name, ParticipationStatus.Accepted));
    this.sortParticipants();
    inputObj.value = "";
  }

  participantMatchFilter(participant: Participant, filterString: string) : boolean {
    if (!filterString || filterString == "") return true;
    return participant.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
  }

  buildParticipantObject(name: string, status: ParticipationStatus): Participant {
    return { name: name, status: status } as Participant;
  }

  filterChanged(filterString: string) : void {
    // console.log("FILTER: " + filterString);
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
      this.participants = response;
      this.sortParticipants();
    });
  }

  removeAllParticipants(): void {
    this.participants = [];
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
