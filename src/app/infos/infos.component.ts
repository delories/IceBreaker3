import { Component, OnInit ,Output,Input} from '@angular/core';
import { Location } from '@angular/common';

import {ActivatedRoute,Router} from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
import { InfosService } from '../shared/infos.service';
import { InfosNum } from '../shared/info.service';
import { PageParams } from '../shared/info.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
  public key:string;
  dataSource:Observable<any>;
  infosNum:Array<any>=[];


 public params; // 保存页面url参数
 public totalNum = 0; // 总数据条数
 public pageSize = 3;// 每页数据条数
 public totalPage :number;// 总页数
 public curPage =1;// 当前页码


  public type:string;

 constructor(location:Location,private routeInfo: ActivatedRoute,private http:Http,private router: Router) {
 	  let key=this.key=this.routeInfo.snapshot.params["key"];
    this.dataSource=this.http.get('http://115.159.39.220:3444/search/'+key+'/num').pipe(map((res)=>res.json()));

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
        this.dataSource.subscribe((data)=>this.infosNum=data);

  }
  //计算总页数
  countPages(totalNum,pageSize){
    let pagesNum=Math.ceil(totalNum/pageSize);
    return pagesNum;
  }

}

