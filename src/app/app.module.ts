import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TwitterService } from 'ng2-twitter';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { FacebookComponent } from './facebook.component';
import {TwitterComponent} from './twitter.component';
import {ErrorComponent} from './error.component';
import {HomeComponent} from './home.component';
import {GraphComponent} from './graph.component';


const approutes : Routes = [
  {path : 'facebook' , component : FacebookComponent , data : {title : 'Facebook API'}},
  {path : 'twitter' , component : TwitterComponent , data : {title : 'Twitter API'}},
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
    GraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes),
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
