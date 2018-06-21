import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public key:string;
  public type="Name";

  constructor(private router: Router) { }

  ngOnInit() {
      
  }
  toInfos(type:string,key:string){
    this.router.navigate(['/infos',type,key]);
    window.location.reload();
  }
  setBoss(){
  this.type="BossName";
}
setName(){
  this.type="Name";
}
setProduct(){
  this.type="MainProduct";
}

}
