export interface Event {
  _id: string,
  name: string
}

export enum ParticipationStatus {
  Unknown = 0,
  Accepted = 1,
  Tentative = 2,
  Declined = 3,
  NoAnswer = 4
}

export interface Participant {
  name: string,
  status: ParticipationStatus
}
