import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css']
})
export class RelationshipComponent implements OnInit {

  @Input()
  id: string;

  constructor() {
  }

  chartOption = {};

  ngOnInit() {

    var option = {};
    var baseUrl = 'http://115.159.39.220:3444/relations/01/map/';
    // var id = id;

    $.ajaxSetup({
      async: false
    });

    console.log(baseUrl + this.id.substr(25));


    // TODO 对于管理的筛查
    $.ajax({
      url: baseUrl + this.id.substr(25),
      id: this.id,
      success: function(data1) {
        console.log(this.id);
        var data = [];      //存储结点信息
        var dot = [];       //用于去重操作
        var link = [];      //存储边集信息
        // var option={};
        var qichachaUrl = "https://www.qichacha.com/";
        //处理点
        for (var i = 0; i < data1.length; i++) {
          var temp = {name:"",category:0,draggable:true};
          //对于初始结点特殊处理
//                if (i == 0){
//                    dot.push(data1[0].fromName);
//                    temp.name=data1[0].fromName;
//                    temp.category = 0;
//                    data.push(temp);
//                    temp={};
//                }
          if (dot.indexOf(data1[i].fromName) == -1) {
            console.log(i);
            console.log(data1[i].fromID);
            console.log(qichachaUrl + this.id.substr(25));
            dot.push(data1[i].fromName);
            if (data1[i].fromID == qichachaUrl + this.id.substr(25)) {
//                        dot.push(data1[i].fromName);
              temp.name = data1[i].fromName;
              temp.category = 0;
              temp.draggable = true;
              data.push(temp);
              console.warn("初始结点的temp");
              console.log(temp);
              temp = {name:"",category:0,draggable:true};
//                        continue;
            } else {
              temp.name = data1[i].fromName;
              //判断是公司还是个人
              //如果是个人
              if (data1[i].fromID.search("pl") != -1) {
                temp.category = 1;
              }
              else                    //否则是公司
                temp.category = 2;
              temp.draggable = true;
              data.push(temp);
              temp = {name:"",category:0,draggable:true};
            }
            console.warn("data");
            console.warn(data);
          }
          if (dot.indexOf(data1[i].toName) == -1) {
            dot.push(data1[i].toName);
            if (data1[i].toID == qichachaUrl + this.id.substr(25)) {
              temp.name = data1[i].toName;
              temp.category = 0;
              temp.draggable = true;
              data.push(temp);
              console.warn("初始结点的temp");
              console.log(temp);
              temp = {name:"",category:0,draggable:true};
//                        continue;
            } else {
              temp.name = data1[i].toName;
              //判断是公司还是个人
              //如果是个人
              if (data1[i].toID.search("pl") != -1) {
                temp.category = 1;
              }
              else                    //否则是公司
                temp.category = 2;
              temp.draggable = true;
              data.push(temp);
              temp = {name:"",category:0,draggable:true};
            }
            console.warn("data");
            console.warn(data);
          }
        }

        //处理边
        for (var i = 0; i < data1.length; i++) {
          var temp1 = {source:"", target:"",value:""};
          temp1.source = data1[i].fromName;
          temp1.target = data1[i].toName;
          if (data1[i].value[0] == "1") {
            temp1.value = "投资";
          } else
            temp1.value = data1[i].value.substring(1);
          link.push(temp1);
        }
        console.log(link);


        // 指定图表的配置项和数据
        option = {
          title: {
            text: '疑似关系'
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12
              }
            }
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
              type: 'graph',
              layout: 'force',
              symbolSize: 80,
              focusNodeAdjacency: true,
              roam: true,
              edgeSymbol: ['', 'arrow'],
              categories: [{
                name: '根',
                itemStyle: {
                  normal: {
                    color: "#009800",
                  }
                }
              }, {
                name: '自然人',
                itemStyle: {
                  normal: {
                    color: "#4592FF",
                  }
                }
              }, {
                name: '企业',
                itemStyle: {
                  normal: {
                    color: "#6222F1",
                  }
                }
              }],
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              force: {
                repulsion: 1000
              },
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10
                  },
                  formatter: "{c}"
                }
              },
              data: data,
              links: link,
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 1,
                  curveness: 0
                }
              }
            }
          ]
        };
      }
    });

    this.chartOption = option;
  }

}
