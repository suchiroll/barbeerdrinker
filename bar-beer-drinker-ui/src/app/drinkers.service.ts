import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DrinkerInfo{
  beer: string;
  bar: string;
  date: string;
  bought: number;
  frequented: number;
  month: string;
  count: number;
  week: string;

}

export interface Drinker {
  name: string;
  city: string;
  phone: string;
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

  getDrinkerInfo(drinker){
    return this.http.get<any[]>('/api/drinker/' + drinker)
  }

  getDrinkerCounts() {
    return this.http.get<any[]>('/api/frequents-drinker');
  }

  getDrinkerBeers(drinker: string) {
    return this.http.get<DrinkerInfo[]>('/api/drinkerbeer/' + drinker);
  }

  beersDrankBy(drinker: string){
     return this.http.get<DrinkerInfo[]>('/api/beersdrankby/' + drinker);
  }

  barsFrequentedBy(drinker: string){
     return this.http.get<DrinkerInfo[]>('/api/barsfrequentedby/' + drinker);
  }


  drinkerMonth(drinker: string){
     return this.http.get<DrinkerInfo[]>('/api/drinkermonth/' + drinker);
  }

  drinkerWeek(drinker: string){
     return this.http.get<DrinkerInfo[]>('/api/drinkerweek/' + drinker);
  }

}
