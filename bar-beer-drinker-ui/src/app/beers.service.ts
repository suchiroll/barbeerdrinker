import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Beer {
  name: string;
  manufacturer: string;
}

export interface BeerLocation {
  bar: string;
  price: number;
  customers: number;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private http: HttpClient) { }

  getBeers() {
    return this.http.get<any[]>('/api/beer');
  }

  getBarsSelling(beer: string) {
    return this.http.get<BeerLocation[]>(`/api/bars-selling/${beer}`);
  }

  getBeerManufacturers(beer?: string): any {
    if (beer) {
      return this.http.get<string>(`/api/beer-manufacturer/${beer}`);
    }
    return this.http.get<string[]>('/api/beer-manufacturer');
  }

  barSales(beer: string) {
    return this.http.get<any[]>('/api/topbarsbybeer/'+beer);
  }

  beerDrinkers(beer: string) {
    return this.http.get<any[]>('/api/beerdrinkers/'+ beer);
  }

  beerHour(beer: string) {
    return this.http.get<any[]>('/api/beerhour/'+ beer);
  }


}
