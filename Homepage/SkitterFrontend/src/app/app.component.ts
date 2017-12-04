import { Component, OnInit, OnChanges } from '@angular/core';

import { InitiateService } from './initiate.service'

@Component({
  selector: 'app-root',
  providers: [InitiateService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loggedIn: boolean;
  loginData: {"username": string, "password": string};
  user: {"email": string, "username": string, "picture": any}

  constructor(private InitiateService: InitiateService) { }

  login() {
    this.InitiateService
      .login(this.loginData)
      .then((response: any) => {
        if (response === undefined || response.error === "Not Logged In" || response.email === "Wrong Credentials") {
          this.loginData.password = "";
          alert("Login Failed");
        }
        else {
          this.getProfile();
        }
      });
  }

  getProfile() {
    this.InitiateService
      .getProfileData()
      .then((userData: { "email": string, "username": string, "picture": any }) => {
        this.user = userData;
        if (this.user !== undefined && this.user.email !== "") {
          //Now logged in on success
          this.loggedIn = true;
        }
        else {
          this.loginData.password = "";
          alert("Authentication Failed");
        }
      });
  }

  ngOnInit() {
    this.loggedIn = false;
    this.loginData = { "username": "", "password": "" }
    this.user = { "email": "", "username": "", "picture": ""};
    if (document.cookie.indexOf('sid') !== -1) {
      //Logged in, fetch data
      this.getProfile();
      
    }
    else {
      //Not logged in
    }
  }
}
