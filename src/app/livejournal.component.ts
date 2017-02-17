import { Component } from '@angular/core';
import { Http, Response }          from '@angular/http';


@Component({
  selector : 'livejournal',
  templateUrl : './livejournal.component.html'
})


export class LiveJournalComponent{

    user_name : string;
    lvurl : string;
    content : any;
    constructor (private http : Http){
      this.user_name = "valerois";
      this.lvurl = 'http://www.livejournal.com/misc/fdata.bml?user=' + this.user_name;
      this.content = "Empty";
    }

    getUserFriends(){

      this.http.get(this.lvurl)
                  .subscribe((res) => {
                    this.content = res;
                    console.log(res)
                  });
    }

}
