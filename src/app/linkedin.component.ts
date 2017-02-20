import { Component }  from '@angular/core';
import 'rxjs/add/operator/map';
import {LinkedinService} from './linkedinService.service'

declare var IN : any ;


@Component({
  selector : 'linkedin',
  templateUrl : 'linkedin.component.html'
})



export class LinkedInComponent{

  yes: boolean;
  respo : any;
  nom : string;

  constructor(private linkedinS: LinkedinService){
  //  this.yes = IN.User.isAuthorized();
  //  IN.User.authorize(null);
  // IN.Event.onOnce(IN, systemReady , callback);

}



  getPersoProfile(){

      IN.API.Profile("me")
               .fields([

                       "firstName","lastName","headline","positions:(company,title,summary,startDate,endDate,isCurrent)","industry",
                       "location:(name,country:(code))","pictureUrl","publicProfileUrl","emailAddress",
                       "educations","dateOfBirth"])


               .result(function(data){


                 console.log(data);


               })


  }

}
