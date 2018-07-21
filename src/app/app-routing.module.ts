import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfosComponent } from './infos/infos.component';
import { DetailsComponent } from './details/details.component';
import { PagesComponent } from './pages/pages.component';
import {InfosShowComponent }from './infos-show/infos-show.component';


const routes: Routes = [
{path:' ',redirectTo:'/home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'infos/:key/:type',component:InfosComponent,children:[
	{path:'page/:curPage/:sortKey/:sortOrder',component:InfosShowComponent}
]},
{path:'details/:id',component:DetailsComponent},
{path:'**',component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
