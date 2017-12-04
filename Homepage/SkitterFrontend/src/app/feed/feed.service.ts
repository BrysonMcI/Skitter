import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeedService {

  constructor(private http: Http) { }

  getSkitFeed(): Promise<void | any> {
    return this.http.get('/GetSkits')
      .toPromise()
      .then(function (response) {
        return response.json() as {"success": string, "skits": [{"author": string, "content": string, "join_type": { "name": string }}]}
      })
      .catch(this.handleError);
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
