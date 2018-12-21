import { Component, OnInit } from '@angular/core';
import { BeersService, Beer, BeerLocation } from '../beers.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { SelectItem } from 'primeng/components/common/selectitem';

declare const Highcharts: any;

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerName: string;
  beerLocations: BeerLocation[];
  manufacturer: string;

  filterOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor(
    private beerService: BeersService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.beerName = paramMap.get('beer');

      this.beerService.getBarsSelling(this.beerName).subscribe(
        data => {
          this.beerLocations = data;
        }
      );

      this.beerService.getBeerManufacturers(this.beerName)
        .subscribe(
          data => {
            this.manufacturer = data;
          }
        );

      this.beerService.barSales(this.beerName).subscribe(
         data => {
            console.log(this.beerName)
            console.log(data);

            const bars = [];
            const counts = [];

            data.forEach(bar => {
              bars.push(bar.bar);
              counts.push(bar.customers);
            });

            this.renderChart(bars, counts);
        });

      this.beerService.beerDrinkers(this.beerName).subscribe(
         data => {
            console.log(data);

            const drinkers = [];
            const counts = [];

            data.forEach(drinker => {
              drinkers.push(drinker.drinker);
              counts.push(drinker.customers);
            });

            this.renderChartB(drinkers, counts);
        });

      this.beerService.beerHour(this.beerName).subscribe(
         data => {
            console.log(data);

            const hours = [];
            const counts = [];

            data.forEach(beer => {
              hours.push(beer.hour);
              counts.push(beer.etc);
              console.log(beer.etc)
            });

            console.log(counts);
            this.renderChartHour(hours, counts);
        });

      this.filterOptions = [
        {
          'label': 'Low price first',
          'value': 'low price'
        },
        {
          'label': 'High price first',
          'value': 'high price'
        },
        {
          'label': 'Most frequented first',
          'value': 'high customer'
        },
        {
          'label': 'Least frequented first',
          'value': 'low customer'
        }
      ];
    });
  }

  ngOnInit() {
  }

  sortBy(selectedOption: string) {
    if (selectedOption === 'low price') {
      this.beerLocations.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOption === 'high price') {
      this.beerLocations.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (selectedOption === 'low customer') {
      this.beerLocations.sort((a, b) => {
        return a.customers - b.customers;
      });
    } else if (selectedOption === 'high customer') {
      this.beerLocations.sort((a, b) => {
        return b.customers - a.customers;
      });
    }
  }

  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('topbars', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Bars Where Sold'
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

  renderChartB(drinkers: string[], counts: number[]) {
    Highcharts.chart('topdrinkers', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Drinkers'
      },
      xAxis: {
        categories: drinkers,
        title: {
          text: 'Drinker'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number Consumed'
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

  renderChartHour(hours: string[], counts: number[]) {
    Highcharts.chart('hour', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Hours When Sold'
      },
      xAxis: {
        categories: hours,
        title: {
          text: 'Hours'
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
}
