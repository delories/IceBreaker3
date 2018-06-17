import { Component,Input, Output,EventEmitter,OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';
@Component({
  selector: 'app-main-staff',
  templateUrl: './main-staff.component.html',
  styleUrls: ['./main-staff.component.css']
})
export class MainStaffComponent implements OnInit {

   dataSource:Observable<any>;
   staff:Array<any>=[];

  constructor(private routeInfo: ActivatedRoute,private http:Http) { 
  	let id=this.routeInfo.snapshot.params["id"];
  	let id_=id.substring(25);
	this.dataSource=this.http.get('http://115.159.39.220:3444/relations/0/'+id_).pipe(map((res)=>res.json()));
    }

  ngOnInit() {
  this.dataSource.subscribe((data)=>this.staff=data);
  }

}
