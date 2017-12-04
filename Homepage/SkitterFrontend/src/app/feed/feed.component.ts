import { Component, OnInit } from '@angular/core';

import { FeedService } from './feed.service'

@Component({
  selector: 'app-feed',
  providers: [FeedService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed: { "success": string, "skits": [{ "author": string, "content": string, "join_type": { "name": string } }] }

  constructor(private FeedService: FeedService) { }
  ngOnInit() {
    this.FeedService.getSkitFeed()
      .then((response: { "success": string, "skits": [{ "author": string, "content": string, "join_type": { "name": string } }] }) => {
        this.feed = response;
      })
  }
}
