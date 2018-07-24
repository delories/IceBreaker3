import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

import {OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Http} from '@angular/http';
import { Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';


import * as _ from 'lodash';

@Component({
  selector: 'app-the-investment',
  templateUrl: './the-investment.component.html',
  styleUrls: ['./the-investment.component.css']
})
export class TheInvestmentComponent implements OnInit {
  // dataSource: Observable<any>;
  // investments: Array<any> = [];
public dataSource: Observable<any>;
 public investments;

  //constructor(private routeInfo: ActivatedRoute, private http: Http) {
  constructor(private router: Router,private routeInfo: ActivatedRoute, private http: Http) {    let id = this.routeInfo.snapshot.params["id"];
    let id_ = id.substring(25);
    this.dataSource = this.http.get('http://139.196.101.226:3444/relations/0/' + id_).pipe(map((res) => res.json()));
  }
  ngOnInit() {
    this.dataSource.subscribe((data) => this.investments = data);
  }

  holdersFilter(holders) {
    let hoder = _.filter(holders, function (o) {
        return _.startsWith(o.value, '1');
      }
    );
    return _.uniqBy(hoder, 'id');
  }

  moneyMatch(str) {

    if (escape(str).indexOf("%u") < 0 && escape(str).indexOf("-") < 0) {
      return str + "(万人民币)";
    }
    else {
      return str;
    }
  }
  toTheCompany(str){
  this.router.navigate(['/details',str]);
  window.location.reload();
  }}
