import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';
import { ParticipationStatus } from '../interfaces/event';

@Pipe({ name: 'participationStatus' })

@Injectable()
export class ParticipationStatusPipe implements PipeTransform {
  transform(value: ParticipationStatus) {
    if (value == ParticipationStatus.Unknown) return 'Unknown';
    if (value == ParticipationStatus.Accepted) return 'Accepted';
    if (value == ParticipationStatus.Tentative) return 'Tentative';
    if (value == ParticipationStatus.Declined) return 'Declined';
    if (value == ParticipationStatus.NoAnswer) return 'Has not answered';
    return '';
  }
}
