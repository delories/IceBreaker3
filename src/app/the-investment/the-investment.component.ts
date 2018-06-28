import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-the-investment',
  templateUrl: './the-investment.component.html',
  styleUrls: ['./the-investment.component.css']
})
export class TheInvestmentComponent implements OnInit {
  dataSource: Observable<any>;
  investments: Array<any> = [];

  constructor(private routeInfo: ActivatedRoute, private http: Http) {
    let id = this.routeInfo.snapshot.params["id"];
    let id_ = id.substring(25);
    this.dataSource = this.http.get('http://115.159.39.220:3444/relations/0/' + id_).pipe(map((res) => res.json()));
    console.error("this.dataSource");
    console.log("http://115.159.39.220:3444/relations/0/" + id_);
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
