import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, BarMenuItem } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})

export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  menu: BarMenuItem[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;

        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        }
      );

      barService.getMenu(this.barName).subscribe(
        data => {
          this.menu = data;
        }
      );

    this.barService.beerSales(this.barName).subscribe(
         data => {
            console.log(data);

            const beers = [];
            const counts = [];

            data.forEach(beer => {
              beers.push(beer.beer);
              counts.push(beer.customers);
            });

            this.renderChartBar(beers, counts);
        });

      this.barService.drinkerSales(this.barName).subscribe(
         data => {
            console.log(data);

            const drinkers = [];
            const counts = [];

            data.forEach(drinker => {
              drinkers.push(drinker.drinker);
              counts.push(drinker.customers);
            });

            this.renderChart(drinkers, counts);
        });

        this.barService.barMonth(this.barName).subscribe(
         data => {
            console.log(data);

            const months = [];
            const counts = [];

            data.forEach(bar => {
              months.push(bar.month);
              counts.push(bar.count);
            });

            this.renderChartMonth(months, counts);
        });

        this.barService.barWeek(this.barName).subscribe(
         data => {
            console.log(data);

            const weeks = [];
            const counts = [];

            data.forEach(bar => {
              weeks.push(bar.week);
              counts.push(bar.count);
            });

            this.renderChartWeek(weeks, counts);
        });

      this.barService.barHour(this.barName).subscribe(
         data => {
            console.log(data);

            const hours = [];
            const counts = [];

            data.forEach(bar => {
              hours.push(bar.hour);
              counts.push(bar.count);
            });

            this.renderChartHour(hours, counts);
        });

    });
  }

  ngOnInit() {
  }

  renderChartBar(bars: string[], counts: number[]) {
    Highcharts.chart('topbeers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Beers'
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

  renderChart(drinkers: string[], counts: number[]) {
    Highcharts.chart('topdrinkers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Beers'
      },
      xAxis: {
        categories: drinkers,
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

  renderChartMonth(drinkers: string[], counts: number[]) {
    Highcharts.chart('month', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Months'
      },
      xAxis: {
        categories: drinkers,
        title: {
          text: 'Months'
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

  renderChartWeek(drinkers: string[], counts: number[]) {
    Highcharts.chart('week', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Day of Week'
      },
      xAxis: {
        categories: drinkers,
        title: {
          text: 'Day of Week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number sold'
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

  renderChartHour(drinkers: string[], counts: number[]) {
    Highcharts.chart('hour', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Hours'
      },
      xAxis: {
        categories: drinkers,
        title: {
          text: 'Hour'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number Sold'
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
