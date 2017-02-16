import { Component } from '@angular/core';
import {FacebookService, FacebookLoginResponse ,FacebookInitParams} from 'ng2-facebook-sdk';

@Component({
  selector: 'facebook-api',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css'],
  providers: [FacebookService]
})
export class FacebookComponent {
  title = 'Facebook API Test ...';
  fullname : string;
  picture : string;
  likes : any;
  posts : any;
  ogp: any;
  ogpurl: any;
  constructor(private fb: FacebookService){
    let fbParams: FacebookInitParams = {
                                  appId: '1218689591511564',
                                  status: true,
                                  cookie: true,
                                  xfbml: true,
                                  version: 'v2.6'
                                  };
   this.fb.init(fbParams);
  }

  loginFacebook(): void {
    this.fb.login().then(
      (response: FacebookLoginResponse) => console.log(response),
      (error: any) => console.error(error)
    );
  }

  getName() : void{
      this.fb.api('/me', "get",  {
            fields: 'name,likes',
            }).then(
              (response: any) => {this.fullname = response.name; console.log(response)},
              (error: any) => console.error(error)
            )
  }

  getPicture() : void{
      this.fb.api('/me', "get",  {
            fields: 'picture',
            }).then(
              (response: any) => {this.picture = response.picture.data.url; console.log(response)},
              (error: any) => console.error(error)
            )
  }

  getLikes() : void{
      this.fb.api('/me/likes', "get",  {
            fields: '',
            }).then(
              (response: any) => { this.likes = response.data; console.log(this.likes);},
              (error: any) => console.error(error)
            )
  }

  getPosts() : void{
      this.fb.api('/me/posts', "get",  {
            fields: '',
            }).then(
              (response: any) => { this.posts = response.data; console.log(response);},
              (error: any) => console.error(error)
            )
  }

  searchOGP() : void {
    this.fb.api('/'+this.ogpurl+'?metadata=1', "get",  {
          fields: '',
          }).then(
            (response: any) => { this.ogp = response; console.log(response);},
            (error: any) => console.error(error)
          )
  }

}
