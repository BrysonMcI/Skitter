import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class YourProfileService {

  constructor(private http: Http) { }

  changeDisplayName(username: string) {
    var headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    headers.set('X-Requested-With', 'XMLHttpRequest')
    return this.http.post('/changeDisplayName', this.formatData({ "newUsername": username }), { headers: headers })
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
