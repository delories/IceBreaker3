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

  layer = 2;


  constructor() {
  }

  chartOption:{series?:{initialTreeDepth?: number}};
  // chartOption: {series: {}; title: { text: string; }; tooltip: { trigger: string; triggerOn: string; }};
  // chartOption: {series: {}; title: {  }; tooltip: {  }};

  ngOnInit() {

    this.draw(1);
  }

  draw(num: number) {


    let option = {};
    // let option = {series: {}, title: { text: string }, tooltip: { trigger="", triggerOn=""}};
    // let option = {series: {}, title: {  }, tooltip: { }};
    const baseUrl = 'http://115.159.39.220:3444/relations/';

    $.ajaxSetup({
      async: false
    });
    // console.warn('warn');
    const url1 = baseUrl + '1/' + this.id.substr(25) + '/3';
    const url2 = baseUrl + '0/' + this.id.substr(25) + '/3';
    $.get(url1, function (data1) {
      $.get(url2, function (data2) {
        const investment = {name: '', children: []};
        const shareholder = {name: '', children: []};


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
          if (data1.children[i].children != []) {
            for (let j = 0; j < data1.children[i].children.length; j++) {
              //备份name:id的键值对
              //...
              //删除id属性
              delete data1.children[i].children[j].id;
              // var temp2 = temp1.children[j];
              if (data1.children[i].children[j].children != []) {
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
          if (data2.children[i].children != []) {
            for (let j = 0; j < data2.children[i].children.length; j++) {
              //备份name:id的键值对
              //...
              //删除id属性
              delete data2.children[i].children[j].id;
              // var temp2 = temp1.children[j];
              if (data2.children[i].children[j].children != []) {
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
        investment.children = data1.children;
        shareholder.name = '股东';
        shareholder.children = data2.children;

        const data = {name: '', children: []};
        data.name = data1.name;
        data.children = [];
        data.children.push(investment);
        data.children.push(shareholder);

        // option = {
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

              initialTreeDepth: num,

              animationDurationUpdate: 750

            }
          ]
        };

      });
    });
    this.chartOption = option;
    // this.chartOption.on('click', function (params) {
    //   window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
    // });
  }


  selectChangeHandler(event: any) {
    // option.series.initialTreeDepth = event.target.value;
    // this.chartOption = option;
    console.log(event.target.value);
    // var temp = this.chartOption;
    // temp.series.initialTreeDepth=1;
    // this.chartOption.series.initialTreeDepth = event.target.value;
    // this.chartOption=temp;
    this.draw(event.target.value);
  }
}
