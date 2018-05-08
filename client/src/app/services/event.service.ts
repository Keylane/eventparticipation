import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: Http) { }

  getEvents() {
    return this.http.get(environment.domain + "/event").map(res => res.json());
  }

  getEvent(eventId: any) {
    return this.http.get(environment.domain + "/event/" + eventId).map(res => res.json());
  }

  getParticipants(eventId: any) {
    return this.http.get(environment.domain + "/event/" + eventId + "/participants").map(res => res.json());
  }

}
