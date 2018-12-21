import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Bar {
  name: string;
  license: string;
  city: string;
  phone: string;
  address: string;
}

export interface BarMenuItem {
  beer: string;
  manufacturer: string;
  price: number;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }

  getDrinkerCounts() {
    return this.http.get<any[]>('/api/frequents-drinker');
  }

  getAvgPrice() {
    return this.http.get<any[]>('/api/avgprice');
  }

  beerSales(bar: string){
     return this.http.get<any[]>('/api/beersales/' + bar);
  }

  drinkerSales(bar: string){
     return this.http.get<any[]>('/api/drinkersales/' + bar);
  }

  barMonth(bar: string){
     return this.http.get<any[]>('/api/barmonth/' + bar);
  }

  barWeek(bar: string){
     return this.http.get<any[]>('/api/barweek/' + bar);
  }

  barHour(bar: string){
     return this.http.get<any[]>('/api/barhour/' + bar);
  }


}
