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

  constructor(private router: Router) { }

  ngOnInit() {
  }
   toInfos(key:string){
  this.router.navigate(['/infos',key]);
  window.location.reload();
  }

}
