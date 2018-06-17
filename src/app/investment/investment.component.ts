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
        const investment = {name:"", children:[]};
        const shareholder = {name:"", children:[]};
        investment.name = '对外投资';
        investment.children = data1.children;
        shareholder.name = '股东';
        shareholder.children = data2.children;
        const data = {name:"", children:[]};
        data.name = data1.name;
        data.children = [];
        data.children.push(investment);
        data.children.push(shareholder);

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
