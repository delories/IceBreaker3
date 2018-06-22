import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public key:string;
    type="Name";
dataSource:Observable<any>;
  autoInfos:Array<any>=[];

  constructor(private router: Router,private http:Http) { }

  ngOnInit() {
      
  }
   showAutoComplete(){
    this.dataSource=this.http.get('http://115.159.39.220:3444/search/'+this.type+'/'+this.key+'/autoprefix').pipe(map((res)=>res.json()));

  this.dataSource.subscribe((data)=>this.autoInfos=data);
  $("#autoInfo").show();
  }
  hideAutoComplete(){
  $("#autoInfo").hide();
  }
  setKey(str){
    this.key=str;
    $("#text").val=str;
    $("#autoInfo").hide();
  }
  chooseAutoKey(autoInfos){
  let sortInfos=_.orderBy(autoInfos, ['PR'], "desc");
  return _.slice(sortInfos,0,11)
  }

   toInfos(key:string,type:string){
  this.router.navigate(['/infos',key,type]);
  window.location.reload();
  }
 setName(){
    this.type="Name";
  }
  setBossName(){
  this.type="BossName";
  }
  setProduct(){
  this.type="MainProduct";
  }
}
