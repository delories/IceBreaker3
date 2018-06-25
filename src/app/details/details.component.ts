import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, of} from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public id: string;
  ownershipURL = '';
  investmentURL = '';
  enterpriseURL = '';
  relationshipURL = '';
  dataSource: Observable<any>;
  company: Array<any> = [];
  detail: Array<any> = [];


  constructor(private routeInfo: ActivatedRoute, private http: Http) {

    console.log(window.location.pathname);    this.ownershipURL = window.location.pathname + '#ownership';
    this.investmentURL = window.location.pathname + '#investment';
    this.enterpriseURL = window.location.pathname + '#enterprise';
    this.relationshipURL = window.location.pathname + '#relationship';


    const id = this.id = this.routeInfo.snapshot.params['id'];
    const id_ = id.substring(25);
    this.dataSource = this.http.get('http://115.159.39.220:3444/company/' + id_).pipe(map((res) => res.json()));
    }


  ngOnInit() {
    this.id = this.routeInfo.snapshot.params['id'];
    this.dataSource.subscribe((data) => this.company = data);
    this.dataSource.subscribe((data) => this.detail = data);
  }



}
