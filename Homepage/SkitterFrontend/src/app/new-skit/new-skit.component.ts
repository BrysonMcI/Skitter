import { Component, OnInit } from '@angular/core';

import { NewSkitService } from './new-skit.service'

@Component({
  selector: 'app-new-skit',
  providers: [NewSkitService],
  templateUrl: './new-skit.component.html',
  styleUrls: ['./new-skit.component.css']
})
export class NewSkitComponent implements OnInit {

  newSkitContent: string;
  maxChar: number;

  constructor(private NewSkitService: NewSkitService) { }

  ngOnInit() {
    this.newSkitContent = "";
    this.maxChar = 140;
  }

  postTheSkit() {
    var content = this.newSkitContent;
    if (content.length > this.maxChar) {
      alert("Your skit is " + (content.length - this.maxChar).toString() + " characters too long!!");
    }
    else {
      this.NewSkitService.submitNewSkit(content)
        .then();
      this.newSkitContent = ""
      var box = (<HTMLInputElement>document.getElementById("newskitcontent"));
      box.value = "";
    }
  }

  contentChange(ev) {
    this.newSkitContent = ev.target.value
  }

}
