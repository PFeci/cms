import { Injectable } from '@angular/core';
import {ObserveOnMessage} from 'rxjs/operators/observeOn';
import {Observable} from 'rxjs/Observable';

export class Event {
  title: string;
  description: string;
  date: any;
  location: any;
  labels: string[];
  cover: string;
}

@Injectable()
export class EventService {

  constructor() { }

  getEvents(): Observable<Event[]> {
    let events: Event[] = [];
    events.push({
      title: 'Angular 5',
      description: 'Why is the Angular5 the best. Come',
      date: new Date(2018, 6, 25),
      labels: ['new', 'angular'],
      location: 'otthon',
      cover: 'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(97).jpg'
    });
    events.push({
      title: 'Alma',
      description: 'Why is the Angular5 the best. Come',
      date: new Date(2018, 11, 2),
      labels: ['new', 'angular', 'gyümölcs', 'egészség'],
      location: 'otthon',
      cover: 'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(98).jpg'
    });
    events.push({
      title: 'Körte',
      description: 'Why is the Angular5 the best. Come',
      date: new Date(2018, 6, 25),
      labels: ['new', 'angular'],
      location: 'otthon',
      cover: 'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(100).jpg'
    });
    events.push({
      title: 'Meet Me',
      description: 'The best trip tipps.',
      date: new Date(2018, 5, 25),
      labels: ['new', 'trip'],
      location: 'Andrassy Street',
      cover: 'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg'
    });
    events.push({
      title: 'Whale whatching',
      description: 'Everything about whale and whatchings',
      date: new Date(2018, 7, 10),
      labels: ['whale', 'whatching'],
      location: 'Atlantic ocean',
      cover: 'https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg'
    });
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(events);
      }, 1000);
    });
  }

}
