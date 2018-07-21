import { Component, OnInit ,Output,Input} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
import { InfosService } from '../shared/infos.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-infos-show',
  templateUrl: './infos-show.component.html',
  styleUrls: ['./infos-show.component.css']
})
export class InfosShowComponent implements OnInit {
  sortKey:string;
  sortOrder:string;
  curPage:number;
  dataSource: Observable<any>;
  infos: Array<any> = [];
  public key:string;
 	public searchType:string;  

  constructor(private http:Http,private routeInfo: ActivatedRoute) {

  let key=this.routeInfo.params["key"];
let searchType=this.routeInfo.params["type"]; 
   let curPage=this.routeInfo.snapshot.params["curPage"];
	this.dataSource=this.http.get('http://139.196.101.226:3444/search/'+searchType+'/'+key+'/8/2').pipe(map((res)=>res.json())); 
}

  ngOnInit() { 
   this.curPage=this.routeInfo.snapshot.params["curPage"];
   this.sortKey=this.routeInfo.snapshot.params["sortKey"];
   this.sortOrder=this.routeInfo.snapshot.params["sortOrder"];

   this.dataSource.subscribe((data) => this.infos = data);
  }
mainProductLimit(str: string, lenn: number) {
    if (str.length <= lenn) {
      return str;
    }
    else {
      return str.substring(0, lenn) + "...";
    }
  }

  infosSort(infos) {
    if (this.sortKey == "RegisterMoney") {
      return _.orderBy(infos, ['RegisterMoney'], [this.sortOrder]);
    }
    else if (this.sortKey == "RegisterDate") {
      return _.orderBy(infos, ['RegisterDate'], [this.sortOrder]);
    }
    else {
      return infos;
    }
  }
}
