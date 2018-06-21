import { Component, OnInit ,Output,Input} from '@angular/core';
import { Location } from '@angular/common';

import {ActivatedRoute,Router} from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
import { InfosService } from '../shared/infos.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  public key:string;
  public type:string;
  dataSource:Observable<any>;
  infosNum:Array<any>=[];


  public params; // 保存页面url参数
  public totalNum = 0; // 总数据条数
  public pageSize = 3;// 每页数据条数
  public totalPage :number;// 总页数
  public curPage =1;// 当前页码

states = [
    {sortKey: '',sortOrder:'', abbrev: '默认排序'},
    {sortKey: 'RegisterMoney',sortOrder:'desc',abbrev: '按注册资本降序'},
    {sortKey: 'RegisterMoney',sortOrder:'asc', abbrev: '按注册资本升序'},
    {sortKey: 'RegisterDate',sortOrder:'desc' ,abbrev: '按注册时间降序'},
    {sortKey: 'RegisterDate',sortOrder:'asc',abbrev: '按注册时间升序'},
  ];


  constructor(location:Location,private routeInfo: ActivatedRoute,private http:Http,private router: Router) {
    let key=this.key=this.routeInfo.snapshot.params["key"];
    let type=this.type=this.routeInfo.snapshot.params["type"];
    this.dataSource=this.http.get('http://115.159.39.220:3444/search/'+type+"/"+key+'/num').pipe(map((res)=>res.json()));

    let vm = this;
    if (vm.params) {
      vm.params = vm.params.replace('?', '').split('&');
      let theRequest = [];
      for (let i = 0; i < vm.params.length; i++) {
        theRequest[vm.params[i].split("=")[0]] = vm.params[i].split("=")[0] == 'pageNo' ? parseInt(vm.params[i].split("=")[1]) : vm.params[i].split("=")[1];
      }
      vm.params = theRequest;
      if (vm.params['pageNo']) {
        vm.curPage = vm.params['pageNo'];
        //console.log('当前页面', vm.curPage);
      }
    }
    else {
      vm.params = {};
    }
  }

  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;

  }

  ngOnInit() {
    this.key=this.routeInfo.snapshot.params["key"];
    this.type=this.routeInfo.snapshot.params["type"];
    this.dataSource.subscribe((data)=>this.infosNum=data);

  }
  //计算总页数
  countPages(totalNum,pageSize){
    let pagesNum=Math.ceil(totalNum/pageSize);
    return pagesNum;
  }
    form = new FormGroup({
    state: new FormControl(this.states[0]),
  });
  returnSortKey(sortParams){
    let oo=JSON.stringify(sortParams);
    let params=JSON.parse(oo);
    return params.state.sortKey;
  }
  returnSortOrder(sortParams){
    let oo=JSON.stringify(sortParams);
    let params=JSON.parse(oo);
    return params.state.sortOrder;
  }}
