import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

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
    console.warn('warn');

    const url1 = baseUrl + '1/' + this.id.substr(25);
    const url2 = baseUrl + '0/' + this.id.substr(25);
    console.log(url1);
    console.log(url2);

    $.get(url1, function (data1) {
      $.get(url2, function (data2) {
        console.log(data1);
        console.log(data2);
        var investment = {};
        var shareholder = {};
        var manager = {};
        investment.name = "对外投资";
        investment.children = data1.children;
        shareholder.name = "股东";
        manager.name = "高管";
        var array_shareholder = data2.children;
        var array_manager = _.remove(array_shareholder, function (n) {
          return n.value[0] === '0';
        });
        shareholder.children = array_shareholder;
        manager.children = array_manager;


        var data = {};
        data.name = data1.name;
        data.children = [];
        data.children.push(investment);
        data.children.push(shareholder);
        data.children.push(manager);

        option = {
          title: {
            text: '企业族谱'
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
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
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
        }

      })
    })


    // $.get(url1, function (data1) {
    //   $.get(url2, function (data2) {
    //     console.log(data1);
    //     console.log(data2);
    //     const investment = {};
    //     const shareholder = {};
    //     investment.name = '对外投资';
    //     investment.children = data1.children;
    //     shareholder.name = '股东';
    //     shareholder.children = data2.children;
    //     const data = {};
    //     data.name = data1.name;
    //     data.children = [];
    //     data.children.push(investment);
    //     data.children.push(shareholder);
    //
    //     option = {
    //       title: {
    //         text: '投资族谱'
    //       },
    //       tooltip: {
    //         trigger: 'item',
    //         triggerOn: 'mousemove'
    //       },
    //       toolbox: {
    //         show: true,
    //         feature: {
    //           mark: {show: true},
    //           dataView: {show: true, readOnly: false},
    //           magicType: {
    //             show: true,
    //             type: ['pie', 'funnel'],
    //             option: {
    //               funnel: {
    //                 x: '25%',
    //                 width: '50%',
    //                 funnelAlign: 'left',
    //                 max: 1548
    //               }
    //             }
    //           },
    //           restore: {show: true},
    //           saveAsImage: {show: true}
    //         }
    //       },
    //       series: [
    //         {
    //           type: 'tree',
    //
    //           data: [data],
    //
    //           top: '18%',
    //           bottom: '14%',
    //
    //           layout: 'radial',
    //
    //           symbol: 'emptyCircle',
    //
    //           symbolSize: 7,
    //
    //           initialTreeDepth: 3,
    //
    //           animationDurationUpdate: 750
    //
    //         }
    //       ]
    //     };
    //
    //   });
    // });
    this.chartOption = option;
  }

}
