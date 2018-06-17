import { Component,Input, Output,EventEmitter,OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
import { Info } from '../shared/info.service';
import { PageParams } from '../shared/info.service';
import { InfosService } from '../shared/infos.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
  dataSource:Observable<any>;
  infos:Array<any>=[];

  @Input('key') key:string;
  @Input('pageSize') pageSize:number;
  @Input('totalNum') totalNum:number;
  @Input('curPage') curPage:number;
  @Input('totalPage') totalPage:number;
  @Input('sortKey') sortKey:string;
  @Input('sortOrder') sortOrder:string;

  // 父组件向子组件传值
  @Output() changeCurPage:EventEmitter<Number> = new EventEmitter;// 子组件向父组件广播事件，触发改变当前页面的事件

  public pageList = [1, 2, 3, 4, 5];

  constructor(private http:Http,private routeInfo: ActivatedRoute) {
    let key=this.routeInfo.snapshot.params["key"];
    this.dataSource=this.http.get("http://115.159.39.220:3444/search/"+key+"/"+this.totalNum+"/1").pipe(map((res)=>res.json()));

  }

  getPageList(pageSize,totalNum,curPage,totalPage) {
    /*分页设置*/
    let pageList=[];
    if (totalPage <= 5) {//如果总的页码数小于5（前五页），那么直接放进数组里显示
      for (let i = 0; i < totalPage; i++) {
        pageList.push({
          pageNo: i + 1
        });
      }
    } else if (totalPage - curPage < 5 && curPage > 4) {//如果总的页码数减去当前页码数小于5（到达最后5页），那么直接计算出来显示
      pageList = [
        {
          pageNo: totalPage - 4
        }, {
          pageNo: totalPage - 3
        }, {
          pageNo: totalPage - 2
        }, {
          pageNo: totalPage - 1
        }, {
          pageNo: totalPage
        }
      ];
    } else {//在中间的页码数
      let cur = Math.floor((curPage - 1) / 5) * 5 + 1;
      pageList = [
        {
          pageNo: cur
        }, {
          pageNo: cur + 1
        }, {
          pageNo: cur + 2
        }, {
          pageNo: cur + 3
        }, {
          pageNo: cur + 4
        },
      ];
    }
    return pageList;
  }

  changePage(pageNo) {
    let vm = this;
    //console.log('修改页码', pageNo);
    this.curPage = pageNo;
    vm.changeCurPage.emit(this.curPage);
  }
  ngOnInit() {
    this.dataSource.subscribe((data)=>this.infos=data);

  }
  infosSort(infos){
    if(this.sortKey=="RegisterMoney"){
      return _.orderBy(infos, ['RegisterMoney'], [this.sortOrder]);
    }
    else if(this.sortKey=="RegisterDate"){
      return _.orderBy(infos, ['RegisterDate'], [this.sortOrder]);
    }
    else{
      return infos;
    }
  }
}
