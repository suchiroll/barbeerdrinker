import { Component, OnInit } from '@angular/core';
import { DrinkersService } from '../drinkers.service';

declare const Highcharts: any;

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.css']
})
export class BarGraphComponent implements OnInit {

  constructor(private drinkersService: DrinkersService) {
    this.drinkersService.getDrinkerCounts().subscribe(
      data => {
        console.log(data);

        const beers = [];
        const counts = [];

        data.forEach(beer => {
          beers.push(beer.beer);
          counts.push(beer.likesCount);
        });

        this.renderChart(beers, counts);
      }
    );
  }

  ngOnInit() {
  }

  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Drinkers by Beer'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Beer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Drinkers'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: counts
      }]
    });
  }

}
