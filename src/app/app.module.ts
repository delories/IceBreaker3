import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }from '@angular/http';
import { Routes,RouterModule } from '@angular/router';
import {Router} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { InfosComponent } from './infos/infos.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PagesComponent } from './pages/pages.component';
import { InfoService } from './shared/info.service';
import { DetailService } from './shared/detail.service';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    InfosComponent,
    HomeComponent,
    SearchComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [InfoService,
  DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
