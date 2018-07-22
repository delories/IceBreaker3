import { Component, OnInit ,Input,OnChanges,SimpleChanges, SimpleChange} from '@angular/core';
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
export class InfosShowComponent implements OnChanges{
  @Input('curPage') curPage:number;
  dataSource: Observable<any>;
  infos: Array<any> = [];
  @Input('key') key:string;
  @Input('searchType') searchType:string;
  @Input('pageSize') pageSize: number;
  @Input('sortKey') sortKey:string;
  @Input('sortOrder') sortOrder:string;

  constructor(private http:Http,private routeInfo: ActivatedRoute) {
}
  ngOnChanges(changes: SimpleChanges) {
  this.dataSource=this.http.get('http://139.196.101.226:3444/search/'+this.searchType+'/'+this.key+'/8/'+this.curPage).pipe(map((res)=>res.json()));
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
