import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  searchForUsers(searchStr: string): Promise<void | any> {
    return this.http.get('/UserSearch?search=' + encodeURI(searchStr))
      .toPromise()
      .then(function (response) {
        return response.json() as string[]
      })
      .catch(this.handleError);
  }

  currentFollowing(): Promise<void | any> {
    return this.http.get('/getFollowing')
      .toPromise()
      .then(function (response) {
        return response.json() as string[]
      })
      .catch(this.handleError);
  }

  followUser(username: string) {
    var headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    headers.set('X-Requested-With', 'XMLHttpRequest')
    return this.http.post('/FollowUser', this.formatData({ "follow": username }), { headers: headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  unfollowUser(username: string) {
    var headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    headers.set('X-Requested-With', 'XMLHttpRequest')
    return this.http.post('/UnfollowUser', this.formatData({ "unfollow": username }), { headers: headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

  private formatData(data) {
    let returnData = '';;
    let count = 0;
    for (let i in data) {
      if (count == 0) {
        returnData += i + '=' + encodeURI(data[i]);
      } else {
        returnData += '&' + i + '=' + encodeURI(data[i]);
      }
      count = count + 1;
    }
    return returnData;
  }
}
