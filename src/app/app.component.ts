import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chart-filter';
  lessThanOrGreaterThan = 'lessThan';
  filterLimit = 100;
  barChart;
  levelsArr = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug'];
  months = [{month: 'Jan', value: '0'},
  {month: 'Feb', value: '1'},
  {month: 'Mar', value: '2'},
  {month: 'Apr', value: '3'},
  {month: 'May', value: '4'},
  {month: 'Jun', value: '5'},
  {month: 'Jul', value: '6'},
  {month: 'Aug', value: '7'}];

  from = '0';

  toMonth = '7';

  chartData = {
    "dataSet1" : Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10),
    "dataSet2" : Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10)
  };


  ngOnInit() {
    this.barChart = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Student Admission Data'
        },
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug'],
        datasets: [
          {
            type: 'bar',
            label: 'School 1',
            data: this.chartData.dataSet1,
            backgroundColor: 'rgba(20,200,10,0.4)',
            borderColor: 'rgba(20,200,10,0.4)',
            fill: false,
          }, {
            type: 'bar',
            label: 'School 2',
            data: this.chartData.dataSet2,
            backgroundColor: 'rgba(100,189,200,0.4)',
            borderColor: 'rgba(100,189,200,0.4)',
            fill: false,
          }
        ]
      }
    });
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

  applyFilter(value){
    //console.log(this.chartData.dataSet1);
    this.barChart.data.datasets[0].data = this.chartData.dataSet1;
    this.barChart.data.datasets[1].data = this.chartData.dataSet2;

    this.barChart.data.datasets.forEach((data,i) => {
      if(this.lessThanOrGreaterThan === 'greaterThan'){
        this.barChart.data.datasets[i].data = data.data.map(v => {
          if(v >= value) return v
          else return 0;
        });
       // console.log(">>>>>>>>", this.barChart.data.datasets[i].data);
      }else{
        this.barChart.data.datasets[i].data = data.data.map(v => {
          if(v <= value) return v;
          else return 0;
        });
        //console.log("?????????", this.barChart.data.datasets[i].data);
      }
    });
    this.barChart.update();
  }

  applyDateFilter(){
    this.barChart.data.labels = this.levelsArr.slice(parseInt(this.from), parseInt(this.toMonth) + 1);
    this.barChart.update();
  }

}
