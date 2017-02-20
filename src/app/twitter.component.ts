import { Component } from '@angular/core'
import { TwitterService } from 'ng2-twitter';
import 'rxjs/add/operator/map';

declare var greuler: any;

@Component({
  selector : 'twitter-api',
  templateUrl : 'twitter.component.html',
  styleUrls : ['./twitter.component.css'],
  providers : []
})

export class TwitterComponent{

  clickedContent : string;
  title = "Twitter API Test ...";
  home_timeline : any;
  first_level_friends : any;
  drawGraph : boolean;
  trends : any;
  searchquery : string;
  searchresults : any;
  divtoshow : number;
  tweet_id : any;
  retweeters : any;
  retweeters_names : any;
  found_user_name : any;
  luserid : any;

  consumerk = {
    consumerKey: '3dOIpTN6l0g2irhS3WtiZDAHM',
    consumerSecret: 'jMFMbGzb7GKTEYK1wlRir9QfR891x8j29Z6kXiitRbAKVmBJMn'
  };
  tokenk = {
    token: '827226788195659777-neUaDFJ9d9e0lEJs2EaaQsTeXcGDVPB',
    tokenSecret: '37Lb5R4KVhl7sBmWSmlwuSC6i6v94B0BAyOlM9HcwpYl8'
  };
  graphData = {
        nodes: [
          {data: {id: 'hamadvsolutions', name: 'SNACenter', faveColor: '#6FB1FC', faveShape: 'ellipse'}}
        ],
        edges: [

        ]
    };

    styles = [
    {
      selector: 'node',
      style: {
        'background-color': '#6FB1FC',
        'label': 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ];

  options = {
    name: 'concentric',
    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
    minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    height: undefined, // height of layout area (overrides container height)
    width: undefined, // width of layout area (overrides container width)
    concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
    return node.degree();
    },
    levelWidth: function( nodes ){ // the variation of concentric values in each level
    return nodes.maxDegree() / 4;
    },
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    ready: undefined, // callback on layoutready
    stop: undefined // callback on layoutstop
  };

  constructor(private twitter: TwitterService){
      this.drawGraph = false;
      this.retweeters_names = {};
  }

  getHomeTimeline(){
    this.divtoshow = 0;
    this.clickedContent = "Home Timeline";
    this.twitter.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      {
        count: 5
      },
      this.consumerk
      ,
      this.tokenk
  ).subscribe((res)=>{
      this.home_timeline = res.json().map(tweet => tweet.text);
      console.log(this.home_timeline);
  });
  }

  getFriends(){
    this.divtoshow = 1;
    this.clickedContent = "List of friends";
    this.twitter.get(
      'https://api.twitter.com/1.1/friends/list.json',
      {
        count: 20,
        screen_name : 'hamadvsolutions'
      },
      this.consumerk
      ,
      this.tokenk
  ).subscribe((res)=>{
      this.first_level_friends = res.json().users;
      console.log(this.first_level_friends);
  });
  
  }


  getTrends(){
    this.divtoshow = 2;
    this.clickedContent = "Trends";
    this.twitter.get(
      'https://api.twitter.com/1.1/trends/place.json',
      {
        id: 23424977
      },
      this.consumerk
      ,
      this.tokenk
  ).subscribe((res)=>{
      this.trends = res.json()[0].trends;
      console.log(this.trends);
  });
  }

  searchTweet(){
      this.divtoshow = 3;
      this.clickedContent = "Search : " + this.searchquery;
      this.twitter.get(
        'https://api.twitter.com/1.1/search/tweets.json',
        {
          q : this.searchquery,
          count : 10
        },
        this.consumerk
        ,
        this.tokenk
    ).subscribe((res)=>{
        this.searchresults = res.json().statuses;
        console.log(this.searchresults);
    });
  }



  showGraph(){
    this.clickedContent = "Drawing Graph";
    this.divtoshow = 4;
    for (let i = 0; i < this.first_level_friends.length; i++) {
        this.first_level_friends[i];
        this.graphData.nodes.push({data: {id: this.first_level_friends[i].name, name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'ellipse'}});
        this.graphData.edges.push({data: {source: 'hamadvsolutions', target: this.first_level_friends[i].name, faveColor: '#6FB1FC'}});
    }
    console.log(this.graphData.nodes);
    this.drawGraph = true;
  }



  findReTweeters(){
    this.clickedContent = "Retweeters : " + this.tweet_id;
    this.divtoshow = 5;
    this.twitter.get(
      'https://api.twitter.com/1.1/statuses/retweeters/ids.json',
      {
        id : this.tweet_id
      },
      this.consumerk
      ,
      this.tokenk
  ).subscribe((res)=>{
      this.retweeters = res.json().ids;
      // for (let i = 0; i < this.retweeters.length; i++) {
      //     this.lookupProfileUserById(this.retweeters[i]);
      // }
      console.log(this.retweeters);
      // console.log(this.retweeters_names);
  });
  }


  lookupProfileUserById(id : string) {
    this.twitter.get(
      'https://api.twitter.com/1.1/users/lookup.json',
      {
        user_id : id
      },
      this.consumerk
      ,
      this.tokenk
  ).subscribe((res)=>{
      this.found_user_name = res.json()[0].name;
      //this.retweeters_names.append(this.found_user_name);
      console.log(this.found_user_name);
  });
  }


  lookUpUser(id : string) {
      this.clickedContent = "Lookup : " + this.luserid;
      this.divtoshow = 6;
      this.twitter.get(
        'https://api.twitter.com/1.1/users/lookup.json',
        {
          user_id : this.luserid
        },
        this.consumerk
        ,
        this.tokenk
    ).subscribe((res)=>{
        this.found_user_name = res.json()[0];
        console.log(this.found_user_name.name);
    });
  }

}
