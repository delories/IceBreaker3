import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewdataService {
//   class newdata1{
//   value:number;
//   name:string;
// };

  public value:number;
  public name:string;
  constructor(value: number, name: string){
    this.value = value;
    this.name = name;

  }
}

export class newData{

  constructor(public value:number, public name:string){

  }
}
