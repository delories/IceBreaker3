import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tupu2',
  templateUrl: './tupu2.component.html',
  styleUrls: ['./tupu2.component.css']
})
export class Tupu2Component implements OnInit {

  constructor() { }
  chartOption = {};

  // ngOnInit() {
  //
  //   var option = {};
  //   var baseUrl = 'http://115.159.39.220:3444/relations/0/';
  //
  //   $.ajaxSetup({
  //     async: false
  //   });
  //
  //   //TODO 对于管理的筛查
  //
  //   //TODO 对于管理的筛查
  //   $.get('http://115.159.39.220:3444/relations/1/firm_181e23a3c35a6fc18450f03cc13bb03b.html/3', function (data1) {
  //     $.get('http://115.159.39.220:3444/relations/0/firm_181e23a3c35a6fc18450f03cc13bb03b.html/3', function (data2) {
  //       console.log(data1);
  //       console.log(data2);
  //       var investment ={};
  //       var shareholder = {};
  //       investment.name="对外投资";
  //       investment.children=data1.children;
  //       shareholder.name = "股东";
  //       shareholder.children  = data2.children;
  //       var data = {};
  //       data.name = data1.name;
  //       data.children=[];
  //       data.children.push(investment);
  //       data.children.push(shareholder);
  //
  //       option = {
  //         tooltip: {
  //           trigger: 'item',
  //           triggerOn: 'mousemove'
  //         },
  //         series: [
  //           {
  //             type: 'tree',
  //
  //             data: [data],
  //
  //             top: '18%',
  //             bottom: '14%',
  //
  //             layout: 'radial',
  //
  //             symbol: 'emptyCircle',
  //
  //             symbolSize: 7,
  //
  //             initialTreeDepth: 3,
  //
  //             animationDurationUpdate: 750
  //
  //           }
  //         ]
  //       };
  //
  //     })
  //   })
  //
  //
  //   this.chartOption = option;
  // }
}
