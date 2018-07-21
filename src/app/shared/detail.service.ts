import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor() { }
}
export class Company{
	constructor(public ID:string,public Logo:string,public Name:string,public Phone:string,public Website:string,public Email:string,public Place:string,public State:string){}
}
export class Detail{

	constructor(public ID:string,public RegisterMoney:string,public RegisterDate:string,public State:string,public UniqueSocietyID:string,public PayPersonID:string,public RegisterID:string,public OrganizationID:string,public CompanyType:string,public Faculty:string,public SellTime:string,public RegisterOrganiztion:string,public ConfirmDate:string,public EnglishName:string,public EverName:string,public Region:string,public trade:string,public location:string,public MainProduct:string){
	
	}
}
export class relation{

	constructor(public id:string,public value:string,public name:string,public children:string){
	
	}
}