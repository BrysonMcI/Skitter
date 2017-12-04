import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BrowserModule, DomSanitizer, SafeUrl } from '@angular/platform-browser'

import { YourProfileService } from './your-profile.service'

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  providers: [YourProfileService],
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent {

  @Input() user: { "email": string, "username": string, "picture": any }
  newUserData: { "email": string, "username": string, "picture": any }
  edit: boolean;
  photoURL: string;
  photoURLSafe: SafeUrl

  constructor(private YourProfileService: YourProfileService, private sanitizer: DomSanitizer) { }

  submit() {
    this.edit = false;
    if (this.newUserData.username !== this.user.username) {
      this.YourProfileService.changeDisplayName(this.newUserData.username)
        .then();
    }
    if (this.newUserData.picture !== this.user.picture) {
      // do changeProfileImage
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue !== changes.user.previousValue) {
      this.newUserData = JSON.parse(JSON.stringify(this.user));
      this.photoURL = window.URL.createObjectURL(new Blob([this.user.picture], { type: 'image/png' }));
      this.photoURLSafe = this.sanitizer.bypassSecurityTrustUrl(this.photoURL);
      window.open(window.URL.createObjectURL(new Blob([this.user.picture], { type: 'image/png' })));
    }
  }
}
