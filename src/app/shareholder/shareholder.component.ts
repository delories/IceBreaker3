import { Component,Input, Output,EventEmitter,OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
import * as _ from 'lodash';


@Component({
  selector: 'app-shareholder',
  templateUrl: './shareholder.component.html',
  styleUrls: ['./shareholder.component.css']
})
export class ShareholderComponent implements OnInit {
   public dataSource:Observable<any>;
   public hoders;

constructor(private routeInfo: ActivatedRoute,private http:Http,private router: Router) { 	let id=this.routeInfo.snapshot.params["id"];
  	let id_=id.substring(25);
	this.dataSource=this.http.get('http://139.196.101.226:3444/relations/1/'+id_+"/total").pipe(map((res)=>res.json()));
  }

  ngOnInit() {
    this.dataSource.subscribe((data)=>this.hoders=data);

  }
   moneyMatch(str){
  if(str==null){
  return "-";
  }
    else if(escape(str).indexOf("-")<0){
    return str;
    }
    else{
    return "-";
    }
  }
   moneyStringMatch(str){
    if(str==null){
    return "-";
     }
    else if(escape(str).indexOf("-")<0){
         if(escape(str).indexOf("%u")<0){
         return str+"（万人民币）";

         }
         else
          return str;
    }
    else{
    return "-";
    }
  }
  holdersFilter(holders){
  return _.uniqBy(holders,'id');
  }
  toTheCompany(str){
  this.router.navigate(['/details',str]);
  window.location.reload();
  }
}
