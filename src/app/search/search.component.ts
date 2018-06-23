import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
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

  constructor(private router: Router,private http:Http,private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    this.key=this.routeInfo.snapshot.params["key"];
    this.type=this.routeInfo.snapshot.params["type"];
  }
   showAutoComplete(){
    this.dataSource=this.http.get('http://115.159.39.220:3444/search/'+this.type+'/'+this.key+'/autoprefix').pipe(map((res)=>res.json()));

  this.dataSource.subscribe((data)=>this.autoInfos=data);
  $("#autoInfo").show();
  }
  setKey(str){
    this.key=str;
    $("#tags").val=str;
    $("#autoInfo").hide();
  }
  hideAutoComplete(){
  $("#autoInfo").hide();
  }
  chooseAutoKey(autoInfos){

  let notNullInfos=_.filter(autoInfos,function(o){
  return o.PR!=null;
  });

  let nullInfos=_.filter(autoInfos,function(o){
  return o.PR==null;});

  let uniqueInfos=_.uniqBy(notNullInfos,'_id');
  let sortInfos=_.orderBy(uniqueInfos, ['PR'], 'desc');
  let allInfos=[];
  let infos=[];
  if(this.type=="BossName"){
    infos=_.uniqBy(sortInfos,'BossName');
  }
  else if(this.type=="Name"){
    infos=_.uniqBy(sortInfos,'Name');
  }
  else{
    infos=sortInfos;
  }
    return _.slice(infos,0,9);
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
