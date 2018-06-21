import {Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  @Input()
  id: string;

  constructor() {
  }

  chartOption = {};

  ngOnInit() {

    let option = {};
    const baseUrl = 'http://115.159.39.220:3444/relations/';

    $.ajaxSetup({
      async: false
    });
    // console.warn('warn');
    const url1 = baseUrl + '1/' + this.id.substr(25) + '/3';
    const url2 = baseUrl + '0/' + this.id.substr(25) + '/3';
    // console.log(url1);
    // console.log(url2);
    $.get(url1, function (data1) {
      $.get(url2, function (data2) {
        // let investment = {name:"", children:{value:"",name:""}};
        // let shareholder = {name:"", children:{value:"",name:""}};
        let investment = {name:"", children:[]};
        let shareholder = {name:"", children:[]};
        investment.name = '对外投资';
        investment.children=data1.children;
        // investment.children.value = data1.children.value;
        // investment.children.name = data1.children.name;
        shareholder.name = '股东';
        shareholder.children = data2.children;
        // shareholder.children.value = data2.children.value;
        // shareholder.children.name = data2.children.name;

        // //遍历data1
        // for (let i = 0; i < data1.children.length; i++) {
        //   let newData = {value:"",name:""};
        //   newData.value=data1.children.value;
        //   newData.name=data1.children.name;
        //   investment.push(newData);
        // }

        // console.warn("this is inv and shareh");
        // console.log(shareholder);
        // console.log(investment);
        const data = {name:"", children:[]};
        data.name = data1.name;
        data.children = [];
        data.children.push(investment);
        data.children.push(shareholder);
        console.log(data);

        option = {
          title: {
            text: '投资族谱'
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              type: 'tree',

              data: [data],

              top: '18%',
              bottom: '14%',

              layout: 'radial',

              symbol: 'emptyCircle',

              symbolSize: 7,

              initialTreeDepth: 3,

              animationDurationUpdate: 750

            }
          ]
        };

      });
    });
    this.chartOption = option;
  }

}
