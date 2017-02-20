import { Component } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

declare var gapi: any;

@Component({
    selector: 'google-plus',
    templateUrl: './googleplus.component.html',
    styleUrls: ['./googleplus.component.css'],
    providers: []
})
export class GogglePlusComponent {

    title: string;
    request: any;
    singed: boolean;
    activities: any[];
    keyActivity: string;
    constructor(private http: Http) {
        this.title = "G+ API Test ...";
        this.activities = ["hamza"];

        handleClientLoad();

        function handleClientLoad() {
            console.log("yow I load gapi");
            gapi.load('client:auth2', initClient);
        }
        function initClient() {
            console.log("yow I init the stupid client");
            gapi.client.init({
                apiKey: 'AIzaSyDLomxbKy2QWZ3KXzvpcY00vVUpVpbbhlw',
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: '1008345157030-humvjo5a5gm5gepoep5kgkepqf349qmr.apps.googleusercontent.com',
                scope: 'profile'
            })
        }

        function doAPICallIfSingnIn(isSignedIn) {
            if (isSignedIn) {
                gapi.client.people.people.get({
                    resourceName: 'people/me'
                }).then(function(response) {
                    console.log('Hello, ' + response.result.names[0].givenName);
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            }
        }

    }
    // end constructor

    handleSignInClick() {
        gapi.auth2.getAuthInstance().signIn();
        this.singed = true;
    }


    singOut() {
        gapi.auth2.getAuthInstance().signOut();
        this.singed = false;
    }



    getProfileInfo() {
        gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.connections.get({
                'userId': 'me'
            });
            request.execute(function(resp) {
                console.log('Retrieved profile for:' + resp.nickname);
            });
        });
    }


    getCommentOfAnActivity() {

        gapi.client.load('plus', 'v1', function() {
            alert("hey");
            var request = gapi.client.plus.comments.list({
                'activityId': 'z123z15ggsrhtxdev22aglvowpmvih0c2'
            });

            request.execute(function(resp) {
                alert("resp => " + resp);
                var numItems = resp.items.length;
                alert("numItems => " + numItems);

                for (var i = 0; i < numItems; i++) {
                    console.log(resp.items[i].actor.displayName + ' commented: ' +
                        resp.items[i].object.content);
                }
            });
        });
    }

    getActivities() {
        gapi.client.load('plus', 'v1', function() {
            console.log('im here1');
            var request = gapi.client.plus.activities.search({
                'query': 'awesome'
            });
            console.log('im here2');
            request.execute(function(resp) {
                var numItems = resp.items.length;
                for (var i = 0; i < numItems; i++) {

                    console.log('ID: ' + resp.items[i].id + ' Content: ' +
                        resp.items[i].object.content);
                }
            });
        });
    }

}



/*
 if not singed and you call load :  nothing happen
 if I refresh and not singed : gapi is not defined



*/
