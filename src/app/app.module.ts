import { Injectable } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DetailsComponent} from './details/details.component';
import {InfosComponent} from './infos/infos.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {PagesComponent} from './pages/pages.component';

import {NgxEchartsModule} from 'ngx-echarts';
import {MainStaffComponent} from './main-staff/main-staff.component';
import {TheInvestmentComponent} from './the-investment/the-investment.component';
import {ShareholderComponent} from './shareholder/shareholder.component';
import {RelationshipComponent} from './relationship/relationship.component';
import {EnterpriseComponent} from './enterprise/enterprise.component';
import {InvestmentComponent} from './investment/investment.component';
import {OwnershipComponent} from './ownership/ownership.component';
import {HashLocationStrategy} from "@angular/common";
import {LocationStrategy} from "@angular/common";
import { InfosShowComponent } from './infos-show/infos-show.component';

@Injectable()
export class WindowWrapper extends Window {

}

export function getWindow() { return window; }

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    InfosComponent,
    HomeComponent,
    SearchComponent,
    PagesComponent,
    MainStaffComponent,
    TheInvestmentComponent,
    ShareholderComponent,
    OwnershipComponent,
    InvestmentComponent,
    EnterpriseComponent,
    RelationshipComponent,
    InfosShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: WindowWrapper, useFactory: getWindow}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
constructor(w: WindowWrapper) {
    console.log(w);
  }
}
