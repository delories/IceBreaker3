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
  constructor() {  }


  chartOption = {};

  ngOnInit() {
    let option = {};
    const baseUrl = 'http://139.196.101.226:3444/relations/';

    $.ajaxSetup({
      async: false
    });

    const url1 = baseUrl + '1/' + this.id.substr(25);
    const url2 = baseUrl + '0/' + this.id.substr(25);

    $.get(url1, function (data1) {
      $.get(url2, function (data2) {
        var investment = {name:"",children:[]};
        var shareholder = {name:"",children:[]};
        var manager = {name:"1",children:[]};


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

        investment.name = "对外投资";

        investment.children = data1.children;
        shareholder.name = "股东";

        manager.name = "高管";

        var array_shareholder = data2.children;
        var array_manager = _.remove(array_shareholder, function (n) {
          let temp = n as {value};      //ok... fine
          return temp.value[0] == '0';
          // return n[0]=='0';
        });
        shareholder.children = array_shareholder;
        manager.children = array_manager;

        var data = {name:"",children:[]};
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

    this.chartOption = option;
  }

}
