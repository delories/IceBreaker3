import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
// import {Company, Detail } from '../shared/detail.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public id:string;
  dataSource:Observable<any>;
  company:Array<any>=[];
  detail:Array<any>=[];

  constructor(private routeInfo: ActivatedRoute,private http:Http) {
  	let id=this.id=this.routeInfo.snapshot.params["id"];
    let id_=id.substring(25);
    this.dataSource=this.http.get('http://115.159.39.220:3444/company/'+id_).pipe(map((res)=>res.json()));
    }

  // let Data = [];
  //
  //   $.get

  chartOption = {
    title: {
      text: '堆叠区域图'
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : ['周一','周二','周三','周四','周五','周六','周日']
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'邮件营销',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'联盟广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'视频广告',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
        name:'直接访问',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:'搜索引擎',
        type:'line',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {normal: {}},
        data:[820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }

  ngOnInit() {
    this.id=this.routeInfo.snapshot.params["id"];
    this.dataSource.subscribe((data)=>this.company=data);
    this.dataSource.subscribe((data)=>this.detail=data);



  }



}
