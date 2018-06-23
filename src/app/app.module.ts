import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { InfosComponent } from './infos/infos.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PagesComponent } from './pages/pages.component';
import { InfoService } from './shared/info.service';
import { DetailService } from './shared/detail.service';

import {NgxEchartsModule} from 'ngx-echarts';
import { MainStaffComponent } from './main-staff/main-staff.component';
import { TheInvestmentComponent } from './the-investment/the-investment.component';
import { ShareholderComponent } from './shareholder/shareholder.component';
import {RelationshipComponent} from './relationship/relationship.component';
import {EnterpriseComponent} from './enterprise/enterprise.component';
import {InvestmentComponent} from './investment/investment.component';
import {OwnershipComponent} from './ownership/ownership.component';





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
    RelationshipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextInputAutocompleteModule

  ],
  providers: [InfoService,
  DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
