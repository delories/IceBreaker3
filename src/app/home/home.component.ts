
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @Input()
  key:string;
  public type="Name";
  constructor(private router: Router) { }

  ngOnInit() {
  }
toInfos(type:string,key:string){
  	this.router.navigate(['/infos',type,key]);
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
