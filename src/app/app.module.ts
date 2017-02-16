import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TwitterService } from 'ng2-twitter';
import { RouterModule, Routes } from '@angular/router';
import {PrettyJsonModule} from 'angular2-prettyjson';

import { AppComponent } from './app.component';
import { FacebookComponent } from './facebook.component';
import {TwitterComponent} from './twitter.component';
import {ErrorComponent} from './error.component';
import {HomeComponent} from './home.component';
import {GraphComponent} from './graph.component';
import { GogglePlusComponent } from './googleplus.component'

import {LinkedInComponent} from './linkedin.component';


const approutes : Routes = [
  {path : 'facebook' , component : FacebookComponent , data : {title : 'Facebook API'}},
  {path : 'twitter' , component : TwitterComponent , data : {title : 'Twitter API'}},

  {path : 'linkedin' , component : LinkedInComponent , data : {title : 'LinkedIn API'}},

  {path : 'google-plus' , component : GogglePlusComponent , data : {title : 'Google plus API'}},

  {path : '' , component : HomeComponent , data : {title : 'SNA Graph'}},
  {path : '**' , component : ErrorComponent , data : {title : 'Error 404'}}


];


@NgModule({
  declarations: [
    AppComponent,
    FacebookComponent,
    TwitterComponent,
    ErrorComponent,
    HomeComponent,
    GraphComponent,

    LinkedInComponent,

    GogglePlusComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes),
    PrettyJsonModule
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
