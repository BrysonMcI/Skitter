import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class InitiateService {

  constructor(private http: Http) { }

  login(loginData: { "username": string, "password": string }): Promise<void | any> {
    var headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    headers.set('X-Requested-With', 'XMLHttpRequest')
    return this.http.post('/signin', this.formatData(loginData), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProfileData(): Promise<void | any> {
    return this.http.get('/getProfileInformation')
      .toPromise()
      .then(function (response) {
        return response.json() as { "email": string, "username": string, "picture": any }
      })
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
