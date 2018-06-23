import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-ui/ui/widgets/autocomplete.js';
import * as _ from 'lodash';
import { Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public key:string;
  public type="Name";
  dataSource:Observable<any>;
  autoInfos:Array<any>=[];
  constructor(private router: Router,private http:Http) {
}

  ngOnInit() {
  }
 showAutoComplete(){
    this.dataSource=this.http.get('http://115.159.39.220:3444/search/'+this.type+'/'+this.key+'/autoprefix').pipe(map((res)=>res.json()));

  this.dataSource.subscribe((data)=>this.autoInfos=data);
  $("#autoInfo").show();
  }
setKey(str){
    this.key=str;
    $("#text").val=str;
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
    return _.slice(infos,0,11);
  //return _.slice(allInfos,0,11);
  }

  toInfos(key:string,type:string){
  	this.router.navigate(['/infos',key,type]);
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