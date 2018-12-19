import { Component, OnInit } from '@angular/core';
import { BarsService } from '../bars.service';

declare const Highcharts: any;

@Component({
  selector: 'app-avgprice',
  templateUrl: './avgprice.component.html',
  styleUrls: ['./avgprice.component.css']
})
export class AvgPriceComponent implements OnInit {

  constructor(private barService: BarsService) {
    this.barService.getAvgPrice().subscribe(
      data => {
        console.log(data);

        const bars = [];
        const price = [];

        data.forEach(bar => {
          bars.push(bar.bar);
          price.push(bar.avg);
        });

        this.renderChart(bars, price);
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
        text: 'Avg Price By Bar'
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
          text: 'Average Price'
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
