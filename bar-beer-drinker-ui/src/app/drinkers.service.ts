import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DrinkerLocation {
  name: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class DrinkersService {

  constructor(private http: HttpClient) { }

  getDrinkers() {
    return this.http.get<any[]>('/api/drinker');
  }

  getDrinkerCounts() {
    return this.http.get<any[]>('/api/frequents-drinker');
  }

}
