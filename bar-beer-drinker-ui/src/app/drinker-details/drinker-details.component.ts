import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkersService, Drinker, DrinkerInfo } from '../drinkers.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})
export class DrinkerDetailsComponent implements OnInit {

  drinkerName: string;
  drinkerDetails: Drinker;
  info: DrinkerInfo[];

  constructor(
    private drinkerService: DrinkersService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.drinkerName = paramMap.get('drinker');

      drinkerService.getDrinkerInfo(this.drinkerName).subscribe(
        data => {
          this.info = data;
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

      drinkerService.getDrinkerBeers(this.drinkerName).subscribe(
        data => {
          this.info = data;
        }
      );

      this.drinkerService.beersDrankBy(this.drinkerName).subscribe(
         data => {
           

            const beers = [];
            const counts = [];

            data.forEach(beer => {
              beers.push(beer.beer);
              counts.push(beer.bought);
            });

            console.log(beers);
            this.renderChart(beers, counts);
        });

       this.drinkerService.barsFrequentedBy(this.drinkerName).subscribe(
         data => {
            console.log(data);

            const bars = [];
            const counts = [];

            data.forEach(bar => {
              bars.push(bar.bar);
              counts.push(bar.frequented);
            });

            console.log(counts);
            this.renderChartB(bars, counts);
        });
       
      this.drinkerService.drinkerMonth(this.drinkerName).subscribe(
         data => {
            console.log(data);

            const months = [];
            const counts = [];

            data.forEach(month => {
              months.push(month.month);
              counts.push(month.count);
            });

            console.log(counts);
            this.renderChartMonth(months, counts);
        });
       
      this.drinkerService.drinkerWeek(this.drinkerName).subscribe(
         data => {
            console.log(data);

            const weeks = [];
            const counts = [];

            data.forEach(week => {
              weeks.push(week.week);
              counts.push(week.count);
            });

            console.log(counts);
            this.renderChartWeek(weeks, counts);
        });
    });
  }

  ngOnInit() {
  }

  renderChart(beers: string[], counts: number[]) {
    Highcharts.chart('topbeers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Beers'
      },
      xAxis: {
        categories: beers,
        title: {
          text: 'Beer'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number Bought'
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

  renderChartB(bars: string[], counts: number[]) {
    Highcharts.chart('topbars', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Bars'
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
          text: 'Times Frequented'
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

  renderChartMonth(bars: string[], counts: number[]) {
    Highcharts.chart('month', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Bars'
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
          text: 'Times Frequented'
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

  renderChartWeek(bars: string[], counts: number[]) {
    Highcharts.chart('week', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Weeks'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Week'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Times Frequented'
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
