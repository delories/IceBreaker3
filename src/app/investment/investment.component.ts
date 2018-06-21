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
    $.get(url1, function (data1) {
      $.get(url2, function (data2) {
        let investment = {name:"", children:[]};
        let shareholder = {name:"", children:[]};


        //备份name:id的键值对
        //...
        //删除id属性
        delete data1.id;

        //遍历data1,即为股东信息
        for (let i = 0; i < data1.children.length; i++) {
          // var temp1 = data1.children[i];
          //备份name:id的键值对
          //...
          //删除id属性
          delete data1.children[i].id;
          if (data1.children[i].children!=[]){
            for (let j = 0; j < data1.children[i].children.length; j++) {
              //备份name:id的键值对
              //...
              //删除id属性
              delete data1.children[i].children[j].id;
              // var temp2 = temp1.children[j];
              if (data1.children[i].children[j].children!=[]){
                for (let k = 0; k < data1.children[i].children[j].children.length; k++) {
                  // var temp3 = temp2.children[k];
                  //备份name:id的键值对
                  //...
                  //删除id属性
                  delete data1.children[i].children[j].children[k].id;
                }
              }
            }
          }

        }

        //备份name:id的键值对
        //...
        //删除id属性
        delete data2.id;
        //遍历data2,即为投资信息
        for (let i = 0; i < data2.children.length; i++) {
          // var temp1 = data2.children[i];
          //备份name:id的键值对
          //...
          //删除id属性
          delete data2.children[i].id;
          if (data2.children[i].children!=[]){
            for (let j = 0; j < data2.children[i].children.length; j++) {
              //备份name:id的键值对
              //...
              //删除id属性
              delete data2.children[i].children[j].id;
              // var temp2 = temp1.children[j];
              if (data2.children[i].children[j].children!=[]){
                for (let k = 0; k < data2.children[i].children[j].children.length; k++) {
                  // var temp3 = temp2.children[k];
                  //备份name:id的键值对
                  //...
                  //删除id属性
                  delete data2.children[i].children[j].children[k].id;
                }
              }
            }
          }

        }

        investment.name = '对外投资';
        investment.children=data1.children;
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
