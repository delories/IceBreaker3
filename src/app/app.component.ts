import {Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  // let chartOption=[;

  chartOption = {};

  ngOnInit() {

    var option={};
    var Data = [];      //存储待处理数据信息

    $.ajaxSetup({
      async : false
    });
  }
}

