import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  constructor(private http:Http) {

   }
}

export class Info{

	constructor(public ID:string,public Logo:string,public Name:string,public Phone:string,public BossName:string,public State:string,public RegisterMoney:string,public RegisterDate:string,public Region:string){
	
	}
}
export class InfosNum{
	constructor(public length:number){
	
	}
}
export class PageParams{
	constructor(public key:string,public pageSize:number,public totalNum:number,public curPage:number,public totalPage:number ){}
}