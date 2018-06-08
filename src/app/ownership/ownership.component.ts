import {Component, Input, OnInit} from '@angular/core';

// import * as $ from 'jquery';

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

    var option = {};
    var Data = [];      //存储待处理数据信息
    var dot = [];       //用于去重操作
    var baseUrl = 'http://115.159.39.220:3444/relations/0/';

    $.ajaxSetup({
      async: false
    });

    console.log(this.id.substr(25));
    console.log(baseUrl + this.id);
    // $.get('http://115.159.39.220:3444/relations/0/firm_f1c5372005e04ba99175d5fd3db7b8fc.html', function (data) {
    $.get(baseUrl + this.id.substr(25), function (data) {
//        对获取到的数据进行预处理
      var maxValue = -1;
      var maxName;
      var thisName = data.name;
      for (var i = 0; i < data.children.length; i++) {
        if (data.children[i].value[0] === '1') {
          if (dot.indexOf(data.children[i].name) == -1) {
            dot.push(data.children[i].name);
            // var reg = /\d+(\.\d+)?万元$/;
            var reg = /\d+(\.\d+)?/;
            // var reg = /\d+(\.\d+)?$/;
            var test = data.children[i].value.match(reg);
            var newdata = {};                 //创建临时对象
            newdata.value = parseInt(test);
            newdata.name = data.children[i].name;
            //判别个人股东和企业股东
            if (data.children[i].id.search("pl") != -1) {
              newdata.name += "(自然人股东)";
            } else
              newdata.name += "(企业股东)";
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
      for (var i = 0; i < Data.length; i++) {
        if (Data[i].value == maxValue) {
          Data[i].name += "(大股东)";
        }
      }


      var data = Data;

      var legend_data = [];
      for (var i = 0; i < Data.length; i++) {
        console.log(Data[i].name);
        legend_data.push(Data[i].name);
      }
      console.log(legend_data);

      // 指定图表的配置项和数据
      option = {
        title: {
          text: '股权结构',
          subtext: thisName,
          x: 'center'
        },
        tooltip: {          //这是什么作用？
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
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
          data: data,
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

        },

        ]
      };

    });
    this.chartOption = option;
  }

}
