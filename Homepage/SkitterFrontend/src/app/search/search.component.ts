import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service'

@Component({
  selector: 'app-search',
  providers: [SearchService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString: { "string": string };
  possibleUsers: string[]
  currentFollowing: string[]

  constructor(private SearchService: SearchService) { }

  searchForUsers() {
    this.SearchService.searchForUsers(this.searchString.string)
      .then(response => { this.possibleUsers = response })
  }

  followUser(ev) {
    this.SearchService.followUser(ev)
      .then(response => {
        this.currentFollowing += ev;
      })
  }

  unfollowUser(ev) {
    this.SearchService.unfollowUser(ev)
      .then(response => {
        const index = this.currentFollowing.indexOf(ev);
        this.currentFollowing.splice(index, 1);
      })
  }

  ngOnInit() {
    this.possibleUsers = []
    this.searchString = { "string": ''};
    //Get following
    this.SearchService.currentFollowing()
      .then(response => { this.currentFollowing = response })
  }
}
