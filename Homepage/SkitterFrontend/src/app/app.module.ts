import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RequestOptionsService } from './request-options.service';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { YourProfileComponent } from './your-profile/your-profile.component';
import { SearchComponent } from './search/search.component';
import { NewSkitComponent } from './new-skit/new-skit.component';
import { SkitsComponent } from './feed/skits/skits.component';
import { RepliesComponent } from './feed/skits/replies/replies.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ProfileComponent,
    YourProfileComponent,
    SearchComponent,
    NewSkitComponent,
    SkitsComponent,
    RepliesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{ provide: RequestOptions, useClass: RequestOptionsService }],
  bootstrap: [AppComponent]
})
export class AppModule { }

