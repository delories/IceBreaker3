import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfosService {
public key:string;
public pageSize:number;
public curPage:number;
  constructor(key:string,pageSize:number,curPage:number){
this.key=key;
this.pageSize=pageSize;
this.curPage=curPage;

  }

  get(){
  	return "http://115.159.39.220:3444/search/"+this.key+"/"+this.pageSize+"/"+this.curPage;
  }
}
