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

        const bars = [];
        const counts = [];

        data.forEach(bar => {
          bars.push(bar.bar);
          counts.push(bar.frequentCount);
        });

        this.renderChart(bars, counts);
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
        text: 'Frequenting count at bars'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Bar'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of customers'
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
