import { Component, OnInit } from '@angular/core';
import { DrinkersService } from '../drinkers.service';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-drinkers',
  templateUrl: './drinkers.component.html',
  styleUrls: ['./drinkers.component.css']
})
export class DrinkersComponent implements OnInit {

  drinkers: Drinker[];

  constructor(
    public drinkersService: DrinkersService
  ) {
    this.getDrinkers();
  }


  ngOnInit() {
  }

  getDrinkers() {
    this.drinkersService.getDrinkers().subscribe(
      data => {
        this.drinkers = data;
      },
      error => {
        alert('Could not retrieve a list of bars');
      }
    );
  }

}
