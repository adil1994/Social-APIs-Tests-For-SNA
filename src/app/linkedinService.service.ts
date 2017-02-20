import { Component }  from '@angular/core';
import { Injectable } from '@angular/core';

declare var IN : any ;

@Injectable()
  export class LinkedinService{


      constructor(){

      }

      getPersonProfile() {

        IN.API.Raw('people/~:(id,num-connections,email-address, firstName)?format=json').method('GET').result(function(response){
        this.myStuff = response ;
        console.log('ici',response);
      });
      }


  }
