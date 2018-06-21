import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.css']
})
export class OwnershipComponent implements OnInit {

  @Input()
  id: string;

  constructor() {
  }

  chartOption = {};

  ngOnInit() {

    let option = {};
    const Data = [];      //存储待处理数据信息
    const dot = [];       //用于去重操作
    const baseUrl = 'http://115.159.39.220:3444/relations/0/';
    let bigShareholder;

    $.ajaxSetup({
      async: false
    });

    console.log(this.id.substr(25));
    console.log(baseUrl + this.id.substr(25));
    $.get(baseUrl + this.id.substr(25), function (data) {
//        对获取到的数据进行预处理
      console.log(data);

      let maxValue = -1;
      let maxName;
      let thisName = data.name;
      for (let i = 0; i < data.children.length; i++) {
        if (data.children[i].value[0] === '1') {
          if (dot.indexOf(data.children[i].name) == -1) {
            dot.push(data.children[i].name);
            const reg = /\d+(\.\d+)?/;
            const test = data.children[i].value.match(reg);

            console.error('here');

            var newdata={value:0, name:"0"};

            console.error('there');


            newdata.value = parseInt(test);
            newdata.name = data.children[i].name;
            //判别个人股东和企业股东
            if (data.children[i].id.search('pl') != -1) {
              newdata.name += '(自然人股东)';
            } else {
              newdata.name += '(企业股东)';
            }
            if (newdata.value > maxValue) {
              maxValue = newdata.value;
              maxName = data.children[i].name;
            }
            Data.push(newdata);
          }
        }
      }
      console.log(Data);

      //寻找大股东
      for (let i = 0; i < Data.length; i++) {
        if (Data[i].value == maxValue) {
          bigShareholder=Data[i].name;
          Data[i].name += '(大股东)';
        }
      }


      const data1 = Data;

      const legend_data = [];
      for (let i = 0; i < Data.length; i++) {
        console.log(Data[i].name);
        legend_data.push(Data[i].name);
      }
      console.log(legend_data);
      console.error('look here');
      console.warn('Data');
      console.warn(Data);
      // 指定图表的配置项和数据
      thisName=thisName+"\n\n\n实际控股人: "+bigShareholder;
      option = {
        title: {
          text: '股权结构',
          subtext: thisName,
          x: 'center'
        },
        tooltip: {          //这是什么作用？
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          axisPointer: {
            type: 'none'
          }
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: legend_data
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
        calculable: true,
        series: [{
          name: '股权结构',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data1,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inner',
                formatter: '{c} ({d}%)'
              },
              labelLine: {
                show: false
              }
            }
          }

        }

        ]
      };
    });
    this.chartOption = option;
  }

}
