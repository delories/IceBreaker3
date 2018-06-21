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
      /*$(function(){
      var myData=[{'name':'zhangshan','height':'1.76'},{'name':'lisi','height':'1.86'},{'name':'wangwu','height':'1.96'}];
      $("#tags").autocomplete({
      source:myData,
      focus:function(event,ui){
        console.log('选中了');
        console.dir(ui);
        return false;
      },
      select:function(e,ui){
        $('#tags').val(ui.item.name+'===>'+ui.item.height);
        return false;
      }
      }).autocomplete("instance")._renderItem=function(ul,item){
        return $("<li>")
        .append("<div><span>"+item.name+"</span><br>"+item.height+"</div>")
        .appendTo(ul);

      };

      });*/
  }
   toInfos(key:string){
  this.router.navigate(['/infos',key]);
  window.location.reload();
  }

}
